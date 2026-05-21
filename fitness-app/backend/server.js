// Import Files
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from "./routes/authRoutes.js"




// Create App
const app = express();

connectDB()


// MiddleWare ----- before routes
app.use(express.json())
app.use(cors())
app.use('/api/auth', authRoutes)



// Routes
app.get("/", (req, res)=>{
    res.send("working");
})






// Start Server
app.listen(process.env.PORT,()=>{
    console.log("app started");
})