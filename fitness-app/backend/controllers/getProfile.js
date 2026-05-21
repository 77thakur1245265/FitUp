import User from "../models/User.js"



export const getProfile =async (req, res)=>{
    const id = req.id
    const profile = await User.findById(req.id).select('-password')
    console.log(id)
    return res.status(200).json({profile})
}