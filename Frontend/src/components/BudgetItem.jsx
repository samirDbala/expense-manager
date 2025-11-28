// rrd import
import { Form, Link } from "react-router-dom";

// library imports
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/outline";

// helper functions
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helpers";
import { useEffect, useState } from "react";

const BudgetItem = ({ budget, showDelete = false, expenses}) => {

  const [spent, setSpent] = useState(0);
  const { color } = budget;

  useEffect(() =>{
    const getSpent = async () => {
      const amountSpent = await calculateSpentByBudget(budget._id);
      setSpent(amountSpent);
    }
    getSpent();
  }, [budget._id, expenses])

  return (
    <div className="budget" style={{ "--accent": color }}>
      <div className="progress-text">
        <h3>{budget.budgetTitle}</h3>
        <p>{formatCurrency(budget.budgetAmount)} Budget</p>
      </div>
      <progress max={budget.budgetAmount} value={spent}>
        {formatPercentage(spent / budget.budgetAmount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} Spent</small>
        <small>{formatCurrency(budget.budgetAmount - spent)} Remaining</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form method="post" action="delete" onSubmit={(event) => {
            if (!confirm("Are you sure you want to permanently delete this budget?")) {
                event.preventDefault();
            }
          }}>
            <button type="submit" className="btn"><span>Delete Budget</span>
            <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${budget._id}`} className="btn">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};
export default BudgetItem;
