import express from "express";
import { AuthMiddleware } from "../Middleware/Auth.js";
import { handleCreateExpense, handleGetExpense, handleRemoveExpense } from "../Controllers/expense.controller.js";


const expenseRoute = express.Router()

expenseRoute.post('/addexpense', AuthMiddleware, handleCreateExpense)
expenseRoute.delete('/removeexpense/:expenseId', handleRemoveExpense)
expenseRoute.get('/getexpense', AuthMiddleware, handleGetExpense)

export default expenseRoute;