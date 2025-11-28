import Expense from "../Models/expense.model.js";

export const handleCreateExpense =  async (req, res) => {
    try {
        const userId = req.user.id;
        const { budgetId, expenseTitle, expenseAmount, budgetTitle } = req.body;
        const expense = await Expense.create({
            userId,
            budgetId,
            expenseTitle,
            expenseAmount,
            budgetTitle
        });
        expense.save();
        
        return res.status(201).json({
            success: true,
            message: "Expense created successfully",
            expense
        });
    } catch (error) {
        res.status(500).json({ status: "failed", code:500, message:"Internal server error", error:error.message || "An unexpected error occurred"});
    }
}

export const handleRemoveExpense =  async (req, res) => {
    const expenseId = req.params.expenseId;
    
    try {
        const deletedExpense = await Expense.findByIdAndDelete(expenseId);
        if (!deletedExpense) {
            return res.status(404).json({ status: "failed", code:404, message:"Expense not found" });
        }

        return res.status(200).json({ success: true, message: "Expense deleted successfully",deletedExpense});

    } catch (error) {
        res.status(500).json({ status: "failed", code:500, message:"Internal server error", error:error.message || "An unexpected error occurred"});
    }
}

export const handleGetExpense =  async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await Expense.find({userId: userId})
        
        return res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ status: "failed", code:500, message:"Internal server error", error:error.message || "An unexpected error occurred"});
    }
}