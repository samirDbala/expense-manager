import axios from "axios"

export const deleteExpense = async ({expenseId}) => {
  
    const result = await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/api/expense/removeexpense/${expenseId}`,
    {
    withCredentials: true,
    validateStatus: () => true // optional
    })

  return result.data;
}