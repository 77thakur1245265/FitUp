import mongoose from 'mongoose'


const url = process.env.MONGODB_URI
const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(url)
        console.log("database connected")
    }catch(error){
        console.log(error)
    }
}

export default connectDB