
import connectToMongo from './db.js';
import express from 'express'
import path from 'path'
import authroute from './Routes/auth.js'
import notesroute from './Routes/notes.js'
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
connectToMongo();
const app=express();

app.use(express.json());
app.use(cors())
const __filepath=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filepath)
app.use(express.static(path.join(__dirname,'../../build')))

app.use("*",function(req,res){
    res.sendFile(__dirname,"../../build/index.html")
})

const port=process.env.PORT
app.use('/api/auth',authroute)
app.use('/api/notes',notesroute)
app.listen(port,()=>{
    console.log(`app is listening at http://localhost:${port}`)
})