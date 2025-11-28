import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    budgetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'budget'
    },
    budgetTitle: {
        type: String,
        required: true,
        ref: 'budget'
    },
    expenseTitle: {
        type: String,
        required: true
    },
    expenseAmount: {
        type: Number,
        required: true
    }
    },
    
    {
        timestamps: true   // ← THIS auto-creates createdAt & updatedAt
    }
)

const Expense = mongoose.model('expense', expenseSchema)
export default Expense;