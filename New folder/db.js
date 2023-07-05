const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://HungryHub:122001@cluster0.rj41z1a.mongodb.net/HungryHubMern?retryWrites=true&w=majority'
const mongoDB = async() =>{
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
        if (err) console.log("---", err);
        else console.log("connected");
        const fetched_data = await mongoose.connection.db.collection("food_items"); // to retrieve the data
        fetched_data.find({}).toArray(async function (err, data) {
            const foodCategory = await mongoose.connection.db.collection("foodCategory");
            foodCategory.find({}).toArray(function (err, Catdata) {
                if (err) console.log(err);
                else {
                    global.food_items = data; // global variable 
                    global.foodCategory = Catdata;
                }
            });
            // if(err) console.log(err);
            // else{                        
            //     global.food_items = data;     // global variable 
            //     console.log(global.food_items)
            // }      
        });
    }); 
}

module.exports = mongoDB; 