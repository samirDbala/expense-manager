import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const dbConnect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "ExpenseManager",
        })
        console.log("MongoDB connected")
    } catch (error) {
        console.error(error)
    }
}

export default dbConnect