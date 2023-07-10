const mongoose=require('mongoose');
const mongoURI="mongodb+srv://user:user123@cluster0.9c6eryd.mongodb.net/Notebook";
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log('DB connected successfully')
    })
}
module.exports=connectToMongo;