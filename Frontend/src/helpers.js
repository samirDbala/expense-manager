import axios from "axios";

export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// colors
const generateRandomColor = () => {
  const existingBudgetLength = fetchBudget()?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

export const fetchDetails = async (key) => {
  const result = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/auth/user/details`,
    {
      withCredentials: true,   
      validateStatus: () => true // optional
    })

    return result
}

export const fetchExpense = async () => {
  const result = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/api/expense/getexpense`,
    {
      withCredentials: true,   
      validateStatus: () => true // optional
    })
  const expenses = result.data;
  return expenses
};

export const fetchUsername = async () => {
  const result = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/auth/user/me`,
    {
      withCredentials: true,   
      validateStatus: () => true // optional for 404 errors
    }
  )
  
  const user = result.data.user;
  if(!user) return null;
  return user.username
}

export const fetchBudget = async ()=> {
  const result = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/api/budget/getbudget`,
    {
    withCredentials: true,   
    validateStatus: () => true // optional
    })
  const budgets = result.data.budgets;
  return budgets
}

export const fetchSingleBudget = async ({budgetId})=> {
  const token = JSON.parse(localStorage.getItem("token"));
  const result = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/api/budget/getbudget/${budgetId}`,
    {
    withCredentials: true,
    validateStatus: () => true // optional
    })
  const budget = result.data.budget;
  return budget
}

// get all item from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

// delete item from local storage
export const deleteItem = ({ key, id }) => {
  return localStorage.removeItem("username");
};

// create budget
export const createBudget = async ({ name, amount }) => {
  const result = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/api/budget/addbudget`,
    {
      budgetTitle: name,
      budgetAmount: amount
    }, 
    {
    withCredentials: true,
    validateStatus: () => true // optional
    }
  )
  
  console.log("Data: ", result.data)
  return result.data
};

// create expense
export const createExpense = async ({ name, amount, budgetId, budgetTitle }) => {
  const result = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/api/expense/addexpense`,
    {
      expenseTitle: name,
      expenseAmount: amount,
      budgetId: budgetId,
      budgetTitle: budgetTitle
    },
    {
    withCredentials: true,
    validateStatus: () => true // optional
    }
)
  
  return result.data
};


// total spent by budget
export const calculateSpentByBudget = async (budgetId) => {
  const expenses = await fetchExpense();

  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if expense.id === budgetId I passed in
    if (expense.budgetId !== budgetId) return acc;

    // add the current amount to my total
    return (acc += expense.expenseAmount);
  }, 0);

  return budgetSpent;
};

// FORMATING (date)
export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString("en-GB");

// formating percentages
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
  });
};