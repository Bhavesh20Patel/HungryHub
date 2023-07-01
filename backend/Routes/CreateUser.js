const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");        // JWT
const bcrypt = require("bcrypt");           // Hashing
const jwtSecret = "MynameisBhaveshPatelIamTheOnly12#"

router.post("/createuser", [
    body('email').isEmail(),                //  Validation
    body('name').isLength({ min: 5 }),         //  Validation
    body('password', 'Incorrect Password').isLength({ min: 5 })],    //  Validation
    async (req, res) => {

        const errors = validationResult(req);   // ^ validate whatever the request is coming
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
 
        const salt = await bcrypt.genSalt(10);                           // hashing
        let secPassword = await bcrypt.hash(req.body.password, salt)     // hashing

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })


router.post("/loginuser", [
    body('email').isEmail(),                //  Validation
    body('password', 'Incorrect Password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);   // ^ validate whatever the request is coming
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;

        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct credentials" })
            }
            
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try logging with correct credentials" })
            }

            const data = {
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret)    // authorization token generate ho jaega
            return res.json({ success: true, authToken:authToken });
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

module.exports = router;