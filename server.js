require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

// express app
const app = express()
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

app.use(express.json())


//routes
app.use('/api/workouts' , workoutRoutes)
app.use('/api/user' , userRoutes)

//connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, ()=>{
            console.log('Listening on port ',process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


