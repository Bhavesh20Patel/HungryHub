const express = require('express')
const app = express()
const cors = require('cors')
const mongoDB = require("./db")

// app.use((req,res,next)=>{
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-requested-With, Content-Type, Accept"
//   );
//   next();

// })

app.use(cors (
{
origin: ["https://deploy-men-1whq.vercel.app"],
methods: ["POST", "GET"],
credentials: true
}
));

mongoose.connect('mongodb+srv://HungryHub:122001@cluster0.rj41z1a.mongodb.net/HungryHubMern?retryWrites=true&w=majority')

mongoDB() ;
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
