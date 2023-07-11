const express = require('express')
// const router = require('./CreateUser')
const router = express.Router()

router.post('/foodData', (req,res)=>{          // Post is only best option to send the data to the front-end
    try {
        // console.log(global.food_items)
        res.send([global.food_items, global.foodCategory])
    } catch (error) {
        console.log(error.message)
        res.send("Server Error")
    }
})            

module.exports = router;