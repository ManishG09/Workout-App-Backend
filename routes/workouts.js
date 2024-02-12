const express = require('express')
const {createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requreAuth')



const router = express.Router()

//require auth for all workout routes
router.use(requireAuth)

//Get all workout
router.get('/', getWorkouts)

//Get a single workout
router.get('/:id', getWorkout)

//Post a single workout
router.post('/', createWorkout)

//Delete a single workout
router.delete('/:id', deleteWorkout)

//Update a single workout
router.put('/:id', updateWorkout)

module.exports = router