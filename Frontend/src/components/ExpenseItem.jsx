// rrd imports
import { Link, useFetcher } from "react-router-dom";

// library import
import { TrashIcon } from "@heroicons/react/24/solid";

// helper imports
import {
  fetchBudget,
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../helpers";

const getBudget = async () =>{
  const budget = await fetchBudget()
  return budget;
}

const ExpenseItem = ({ expense, showBudget }) => {
  const fetcher = useFetcher();

  const budget = getBudget()

  return (
    <>
      <td>{expense.expenseTitle}</td>
      <td>{formatCurrency(expense.expenseAmount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {showBudget && (
        <td>
          <Link
            to={`/budget/${budget._id}`}
            style={{ "--accent": budget.color }}
          >
            {budget.name}
          </Link>{" "}
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense._id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};
export default ExpenseItem;
