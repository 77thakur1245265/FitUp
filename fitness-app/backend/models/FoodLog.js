import mongoose from "mongoose";

const foodLog = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now  
    },
    items: [{
        name:     { type: String, required: true },
        quantity: { type: Number, required: true },
        unit:     { 
            type: String, 
            enum: ["grams", "ml", "cups", "pieces"],
            required: true 
        },
        additions: [{
            name:     { type: String },
            quantity: { type: Number },
            unit:     { 
                type: String, 
                enum: ["grams", "ml", "cups(250ml)", "pieces"] 
            }
        }],
        calories: { type: Number, default: 0 },
        protein:  { type: Number, default: 0 },
        carbs:    { type: Number, default: 0 },
        fats:     { type: Number, default: 0 }
    }],
    totalCalories: { type: Number, default: 0 },
    totalProtein:  { type: Number, default: 0 },
    totalFats:     { type: Number, default: 0 }   

}, { timestamps: true })

const FoodLog = mongoose.model('FoodLog', foodLog)

export default FoodLog