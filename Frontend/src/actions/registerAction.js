import axios from 'axios'
import { waait } from '../helpers';
import { redirect } from 'react-router-dom';
import toast from 'react-hot-toast';

export const registerAction = async ({request}) => {

    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    let errors = {};

    if (values.username.trim().length < 5) {
        errors.username = 'Username Must 5 letters long';
    }else if (!/^[a-zA-Z]/.test(values.username.trim())) {
        errors.username = 'Username Must Start with a Letter';
    }

    if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is invalid';
    } 
    
    if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(values.password)) {
        errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[0-9]/.test(values.password)) {
        errors.password = 'Password must contain at least one number';
    }

    if (Object.keys(errors).length > 0) {
        return {errors:errors};
    }

    const res = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/auth/user/registration`, {
        username: values.username,
        email: values.email,
        password: values.password
      }, { withCredentials: true });

    toast.success(`Welcome, ${res.data.username}`);
    
    return redirect('/dashboard');

  }