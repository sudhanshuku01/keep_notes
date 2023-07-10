const connectToMongo=require('./db');
const express=require('express');
const cors=require('cors')
connectToMongo();
const app=express();
app.use(express.json());
app.use(cors())
const port=5000;
app.use('/api/auth',require('./Routes/auth'))
app.use('/api/notes',require('./Routes/notes'))
app.listen(port,()=>{
    console.log(`app is listening at http://localhost:${port}`)
})