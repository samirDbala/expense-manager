import { redirect } from "react-router-dom";
import axios from "axios";

export const githubLoginAction = async ({request}) => {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
    return redirect("/login");
    }

    const res = await axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}/auth/user/github-login`,
    { code },
    { validateStatus: () => true }
    );

    if (!res.data.success) {
    toast.error(res.data.message);
    return redirect("/login");
    }

    localStorage.setItem("token", JSON.stringify(res.data.token));
    localStorage.setItem("username", JSON.stringify(res.data.username));

    return redirect('/dashboard');
}