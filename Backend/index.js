import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import dbConnect from './Controllers/db.js';
import userRouter from './Routes/user.route.js';
import budgetRoute from './Routes/budget.route.js';
import expenseRoute from './Routes/expense.router.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express()

app.use(cookieParser());
app.use(
  cors({
      origin: process.env.FRONT_END_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
  }))
app.use(express.json())
app.use(express.urlencoded())
dbConnect()

//Routes
app.use("/auth/user", userRouter)
app.use("/api/budget", budgetRoute)
app.use("/api/expense", expenseRoute)

//Listen to port
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
