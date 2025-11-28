import axios from 'axios'
import { redirect } from 'react-router-dom';
import { waait } from '../helpers';
import toast from 'react-hot-toast';

export const loginAction = async ({request}) => {
    await waait()
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    let errors = {};

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

    const res = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/auth/user/login`,
        {
            email: values.email,
            password: values.password
        },
        {   
            withCredentials: true,
            validateStatus: () => true
        })
     
    if(res.data.code === 400){
        toast.error(res.data.message)
        return null
    }else if (res.data.code === 401){
        toast.error(res.data.message)
        return null
    }

    return redirect('/dashboard');
  }