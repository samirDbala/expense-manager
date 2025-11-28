import Budget from "../Models/budget.model.js";
import Expense from "../Models/expense.model.js";

export const addBudget = async (req, res) => {
    try {
        const {budgetTitle, budgetAmount} = req.body;
        const user = req.user.id;
    
        const newBudget = new Budget({ budgetTitle, budgetAmount, userId:user })
        await newBudget.save();
        
        return res.status(200).json({ budget: newBudget });
    } catch (error) {
        res.status(500).json({ status: "failed", code:500, message:"Internal server error", error:error.message || "An unexpected error occurred"});
    }
}

export const removeBudget = async (req, res) => {
    try {
        const budgetId = req.params.id;

        const budget = await Budget.findByIdAndDelete(budgetId);
        const expense = await Expense.findByIdAndDelete(budgetId)
        console.log(budget, expense)
        return res.status(200).json({ budget:budget, expense:expense, message: "Remove Budget Controller", budgetId });
    } catch (error) {
        res.status(500).json({ status: "failed", code:500, message:"Internal server error", error:error.message || "An unexpected error occurred"});
    }
}

export const getBudget = async (req, res) => {
    try {
        const budgets = await Budget.find({ userId: req.user.id });
        return res.status(200).json({ budgets });
    } catch (error) {
        res.status(500).json({ status: "failed", code:500, message:"Internal server error", error:error.message || "An unexpected error occurred"});
    }
}

export const getOneBudget = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        return res.status(200).json({ budget });
    } catch (error) {
        res.status(500).json({ status: "failed", code:500, message:"Internal server error", error:error.message || "An unexpected error occurred"});
    }
}