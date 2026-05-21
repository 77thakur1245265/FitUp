import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next)=>{

    try{
        const {authorization} = req.headers
        if(!authorization){
            return res.status(401).json({message:"NO Token"})
        }
        const token = authorization.split(" ")[1]
        const compare = jwt.verify(token, process.env.JWT_SECRET)
        console.log(compare)
        req.id = compare.id
        console.log("valid user , login done", req.id)
        next()
    }catch(error){
        console.log("error occured ->", error)
        return res.status(401).json({message:error.message})
    }
}