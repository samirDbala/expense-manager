// rrd imports
import { Link, Navigate, redirect, useLoaderData } from "react-router-dom";

// library imports
import toast from "react-hot-toast";

// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseFrom from "../components/AddExpenseFrom";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// helpers functions
import {
  createBudget,
  createExpense,
  deleteItem,
  fetchBudget,
  fetchData,
  fetchExpense,
  fetchUsername,
  waait,
} from "../helpers";
import { registerAction } from "../actions/registerAction";
import { useEffect, useState } from "react";
import { deleteExpense } from "../actions/deleteExpense";

// loader
export async function dashboardLoader() {
  const username = await fetchUsername()
  const budgets = await fetchBudget();
  const expenses = await fetchExpense();

  return { username, budgets, expenses };
}

// action
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  console.log(values)

  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget Created!");
    } catch (e) {
      throw new Error("There was a problem creating your budget.");
    }
  }

  if (_action === "createExpense") {
    try {
        await createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
        budgetTitle: values.newExpenseBudgetTitle
      });

      toast.success(`Expense ${values.newExpense} Created!`);
      return null
    } catch (e) {
      throw new Error("it's not working");
    }
  }

  if (_action === "deleteExpense") {
    try {
      const result = await deleteExpense({
        expenseId: values.expenseId
      })
      toast.success("Expense deleted! in Dashboard.jsx");
      return result
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const Dashboard = () => {
  const { username, budgets, expenses } = useLoaderData();

  return (
    <>
      {username ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{username}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseFrom budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget._id} expenses={expenses} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .slice(0, 8)}
                    />
                    {expenses.length > 8 && (
                      <Link to="/expenses" className="btn btn--dark">
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Navigate to='/registration' replace/>
      )}
    </>
  );
};
export default Dashboard;
