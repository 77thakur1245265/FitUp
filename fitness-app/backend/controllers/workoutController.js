import Workout from "../models/Workout.js"



export const postWorkout = async (req, res) => {
    try {
        const { workoutType, exercises, cardio } = req.body
        const userId = req.id  

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const todayWorkouts = await Workout.find({
            userId,
            createdAt: { $gte: today }
        })

        console.log("today workouts count:", todayWorkouts.length)

        if(todayWorkouts.length >= 2) {
            return res.status(400).json({ 
                message: "Maximum 2 workouts per day reached!" 
            })
        }

        if(todayWorkouts.length === 1) {
            const workout = await Workout.create({
                userId,
                workoutType,
                exercises,
                cardio
            })
            return res.status(201).json({ 
                message: "You already have a workout today! Second entry saved.",
                workout 
            })
        }

        const workout = await Workout.create({
            userId,
            workoutType,
            exercises,
            cardio
        })
        return res.status(201).json({ 
            message: "Workout uploaded successfully!",
            workout 
        })

    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getWorkout = async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.id })
        return res.status(200).json({ workouts })
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}
export const editWorkout = async (req, res) => {
    try {
        const workoutId = req.params.id
        console.log("workout id >>>>>>>",workoutId)
        const { exerciseIndex, exercise } = req.body

        // check if workout exists
        const workout = await Workout.findById(workoutId)
        if(!workout) {
            return res.status(404).json({ message: "Workout not found!" })
        }

        
        if(workout.userId.toString() !== req.id) {
            return res.status(403).json({ message: "Not authorized!" })
        }

        // check valid index
        if(exerciseIndex >= workout.exercises.length) {
            return res.status(400).json({ message: "Invalid exercise index!" })
        }

        // update
        const updated = await Workout.findByIdAndUpdate(
            workoutId,
            { $set: { [`exercises.${exerciseIndex}`]: exercise }},
            { returnDocument: 'after' }
        )

        return res.status(200).json({ message: "Workout updated!", updated })

    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}
export const deleteWorkout = async (req, res) => {
    try {
        const workoutId = req.params.id

        const workout = await Workout.findById(workoutId)
        if(!workout) {
            return res.status(404).json({ message: "Workout not found!" })
        }

        if(workout.userId.toString() !== req.id) {
            return res.status(403).json({ message: "Not authorized!" })
        }

        await Workout.findByIdAndDelete(workoutId)
        return res.status(200).json({ message: "Workout deleted successfully!" })

    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}