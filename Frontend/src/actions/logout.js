// rrd imports
import { redirect } from "react-router-dom";

// library
import toast from "react-hot-toast";

// helpers
import { deleteItem } from "../helpers";

export async function logoutAction() {
    // delete the user
    deleteItem({key: "token"})
    deleteItem({key: "username"})
    toast.success("Logged out successfully!")
    
    // return redirect
    return redirect("/login")
}