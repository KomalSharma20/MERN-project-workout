require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const workoutRoutes=require('./routes/workouts')
const userRoutes=require('./routes/user')

//express app
const app=express()
//middleware
app.use(express.json())
app.use('/api/user',userRoutes)
//routes
// app.get('/',(req,res)=>{

//     res.json({mssg:'Welcome to the app'})
// })
app.use('/api/workouts',workoutRoutes)
mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    app.listen(4000,() =>{
        console.log('listening on port', process.env.PORT)
    })
  })

  .catch((error)=>{
    console.log(error)
  })

