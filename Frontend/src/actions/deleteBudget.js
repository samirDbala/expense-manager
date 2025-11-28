// rrd import
import { redirect } from "react-router-dom";

// library
import toast from "react-hot-toast";

// helpers
import { deleteItem, getAllMatchingItems } from "../helpers";
import axios from "axios";

export  async function deleteBudget({ params }) { 
  try {
    const budget = await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/api/budget/removebudget/${params.id}`)
    toast.success("Budget deleted successfully!");
  } catch (e) {
    throw new Error("There was a problem deleting your budget.");
  }
  
  return redirect("/dashboard");
}
