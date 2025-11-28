import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    budgetTitle:{
        type:String,
        required:true
    },
    budgetAmount:{
        type:Number,
        required:true
    }
})

const Budget = mongoose.model('budget', budgetSchema)
export default Budget;