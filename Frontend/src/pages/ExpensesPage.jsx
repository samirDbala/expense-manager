// rrd imports
import { useLoaderData, useNavigate } from "react-router-dom";

import {Link } from "react-router-dom"

// library imports
import toast from "react-hot-toast";

// component imports
import Table from "../components/Table";

// helpers
import { deleteItem, fetchData, fetchExpense } from "../helpers";
import { deleteExpense } from "../actions/deleteExpense";
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

// loader
export async function expensesLoader() {
  const expenses = await fetchExpense()
  return { expenses };
}

// action
export async function expensesAction({request}) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === "deleteExpense") {
      try {
        const result = await deleteExpense({
          expenseId: values.expenseId
        })
        return toast.success("Expense deleted!");
      } catch (e) {
        throw new Error("There was a problem deleting your expense.");
      }
    }
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} Total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <>
          <p>No Expenses To Show</p>
          <div className="flex-md">
          <button className="btn btn--dark" onClick={() => navigate(-1)}>
              <ArrowUturnLeftIcon width={20} />
              <span>Go Back</span>
          </button>
          <Link to="/" className="btn btn--dark">
            <HomeIcon width={20} />
            <span>Go Home</span>
          </Link>
          </div>
        </>
      )}
    </div>
  );
};
export default ExpensesPage;
