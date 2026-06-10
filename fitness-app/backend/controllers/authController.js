import User from "../models/User.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"




export const registerUser = async(req, res)=>{
    try{   
        const {name, username, email, password, age, weight, height, goal}=req.body
        const existingUsername = await User.findOne({username})
        const existingUseremail = await User.findOne({email})
        if(existingUsername || existingUseremail){
            console.log("user exists")
            return res.status(400).json({message:"User already exists!"})
        }
        console.log("password received:", password) 
        const hashedPassword = await bcryptjs.hash(password, 10)
        const user = await User.create({
            name,
            username,
            email,
            password:hashedPassword,
            age,
            weight,
            height,
            goal
        })
        console.log("user created")
        return res.status(201).json({message:"User created successfully", user})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}

export const loginUser = async (req, res)=>{
    try{
        const {username, password} = req.body
        const existingUsername = await User.findOne({username})
        console.log(existingUsername)
        if(existingUsername){
            const match = await bcryptjs.compare(password, existingUsername.password)
            console.log(match)
            if(match){
                const token = jwt.sign(
                    {id:existingUsername._id},
                    process.env.JWT_SECRET,
                    {expiresIn:'7d'}
                )
                //console.log(token)
                return res.status(200).json({message:"user logged in successfully", token})
            }
            console.log("wrong password")
            return res.send("password doesn't match")
        }
        return res.send("username doesn't exists")
        
    }catch(error){
        console.log(error)
        return res.status(400).json({message:error.message})
    }
}



export const getProfile =async (req, res)=>{
    const id = req.id
    const profile = await User.findById(req.id).select('-password')
    console.log(id)
    return res.status(200).json({profile})
}