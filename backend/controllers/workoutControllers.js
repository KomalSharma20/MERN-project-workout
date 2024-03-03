const Workout=require('../models/Workout')
const mongoose=require('mongoose')
//get all
const getWorkouts=async(req,res)=>{
    const workouts=await Workout.find({}).sort({createdAt:-1})
    res.status(200).json(workouts)
}


//get single
const getWorkout=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No element found"})
    }
    //used to get single element on the basis of title
    //const {title,reps,load}=req.body
    //const workouts=await Workout.findOne({title})
    const workout=await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error:"No element found"})
    }
    res.status(200).json(workout)
}
//create
const createWorkout=async(req,res)=>{
    const{title,reps,load}=req.body
    let emptyFields=[]
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill in all the fields', emptyFields})
    }
    //add doc to db
    try{
        const workout=await Workout.create({title,reps,load})
        res.status(200).json(workout)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}
//delete
const deleteWorkout=async(req,res)=>{
    const{id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No element found"})
    }
    const workout=await Workout.findOneAndDelete({_id:id})
    if(!workout){
        return res.status(404).json({error:"No element found"})
    }
    // res.status(200).json({mssg:"Deleted Sucessfully"})
    // res.status(200).json(delWork)
    //res.status(200).json("Remaining
        // res.status(200).json(workouts)
    res.status(200).json({mssg:"Deleted successfully: "+workout})
    
    
}
//update
const updateWorkout=async(req,res)=>{
    const{id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No element found"})
    }
    const workout=await Workout.findOneAndUpdate({_id:id},{...req.body})
    if(!workout){
        return res.status(404).json({error:"No element found"})
    }
    res.status(200).json(workout)
}
module.exports={
    createWorkout,getWorkouts,getWorkout,deleteWorkout ,updateWorkout
}