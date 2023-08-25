import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
const mongoURI=process.env.MONGO_URI;
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log('DB connected successfully')
    })
}
export default connectToMongo;