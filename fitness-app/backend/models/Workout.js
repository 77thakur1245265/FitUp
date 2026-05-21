import mongoose from "mongoose";

const workout = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    exercises:[{
        name:{type:String},
        sets:{type:Number},
        reps:{type: Number},
        maxWeight:{type: Number, default: 0},
        isCompleted:{type: Boolean, default:false},
        isCustom:{type:Boolean, default:false}
    }],
    workoutType:{
        enum:["push", "pull", "legs", "full body"],
        required:true,
        type:String
    },
    cardio:{
        duration:{type: Number},
        distance:{type:Number}
    }
}, {timestamps: true})

const Workout = mongoose.model('Workout', workout)

export default Workout