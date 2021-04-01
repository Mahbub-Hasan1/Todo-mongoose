require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const todoHandler = require('./routeHandler/todoHandler')

// express app initialization
const app = express();
app.use(express.json());

// database connection with mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connection successfully"))
  .catch((err) => console.log(err))

// application routes
app.use('/todo', todoHandler);


// default error handler 
function errorHandler(err, req, res, next){
    if(res.headersSent) {
        return next(err);
    }
    res.status(500).json({error: err});
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.listen(3000, () => {
  console.log("Example app listening at 3000")
})