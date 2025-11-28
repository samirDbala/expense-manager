import { redirect } from "react-router-dom"
import { fetchUsername } from "../helpers"

export const landingLoader = async () => {
    const username = await fetchUsername()
    if(!username) {
        return null
    } else {
        return redirect('/dashboard')
    }
}