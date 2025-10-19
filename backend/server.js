const express=require('express');
const dotenv=require('dotenv');
const connectDB=require('./config/db');


const signin=require('./routes/auth');
const content=require('./routes/content');

dotenv.config();
connectDB(process.env.MONGO_URI);

const app=express();
const port=process.env.PORT|| 3000;



app.use(express.json());

app.use('/api/v1/auth',signin);
app.use('/api/v1/con',content);




app.listen(port,()=>{
    console.log('server started on port  '+port);
})