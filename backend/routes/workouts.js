const express=require('express')
const router=express.Router()
const{
    createWorkout, 
    getWorkouts,getWorkout,deleteWorkout, updateWorkout
}=require('../controllers/workoutControllers')
//get all
router.get('/',getWorkouts)
//get single
router.get('/:id',getWorkout)
//Post
router.post('/',createWorkout)
//delete
router.delete('/:id',deleteWorkout)
//update
router.patch('/:id',updateWorkout)




module.exports=router