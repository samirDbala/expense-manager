import { addBudget, removeBudget, getBudget, getOneBudget } from "../Controllers/budget.controller.js"
import express from "express";
import { AuthMiddleware } from "../Middleware/Auth.js";

const budgetRoute = express.Router()


budgetRoute.post('/addbudget', AuthMiddleware, addBudget)
budgetRoute.delete('/removebudget/:id', removeBudget)
budgetRoute.get('/getbudget', AuthMiddleware, getBudget)
budgetRoute.get('/getbudget/:id', AuthMiddleware, getOneBudget)

export default budgetRoute;