const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//Get all workouts
const getWorkouts = async (req,res) => {
    const user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({createAt : -1})

    res.status(200).json(workouts)
} 


//Get single workout

const getWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.json(404).json({error: "No such Workout"})
    }

    res.status(200).json(workout)
}




//Create a  workout
const createWorkout = async (req,res) => {
    const { title, load, reps} = req.body
    let emptyField = []
    if(!title){
        emptyField.push('title')
    }
    if(!load){
        emptyField.push('load')
    }
    if(!reps){
        emptyField.push('reps')
    }
    if(emptyField.length > 0){
        return res.status(400).json({error: 'Please fill in all fields', emptyField})
    }

    //add to db
    try {
        const user_id = req.user._id
        const workout = await Workout.create({title , reps , load, user_id})
        res.status(200).json(workout)
    }catch (error){
        res.status(400).json({error : error.message})
    }
}



//Delete a  workout
const deleteWorkout = async(req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})
    if (!workout){
        return res.json(404).json({error: "No such Workout"})
    }

    res.status(200).json(workout)
}



//Update a  workout
const updateWorkout = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id : id}, {...req.body})
    if (!workout){
        return res.json(404).json({error: "No such Workout"})
    }

    res.status(200).json(workout)
}




module.exports = {createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout }