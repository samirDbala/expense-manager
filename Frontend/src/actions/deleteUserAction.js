// rrd imports
import { redirect } from "react-router-dom";

import axios from 'axios'

// library
import toast from "react-hot-toast";

// helpers
import { deleteItem } from "../helpers";

export async function deleteUserAction() {

    // delete the user
    const token = JSON.parse(localStorage.getItem("token"));

    const res = await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/auth/user/delete`,
        {   
            withCredentials: true,
            validateStatus: () => true
        })
    

    if(res.data.success === false){
        toast.error(res.data.message)
        return null
    }


    toast.success("Data deleted successfully")

    // return redirect
    return redirect("/dashboard")
}