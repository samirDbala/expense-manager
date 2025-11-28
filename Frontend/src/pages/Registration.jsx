import { useState } from "react";
import { Form, redirect, useActionData, useNavigate } from "react-router-dom";

import googleIcon from "../assets/google.jpg";
import githubIcon from "../assets/github.jpg";

// icons
import { EyeIcon, EyeSlashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {GoogleLogin, useGoogleLogin} from "@react-oauth/google";

// assets
import illustration from "../assets/illustration.jpg";
import axios from "axios";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const errors = useActionData()
  const navigate = useNavigate()

  const GoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
    
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/auth/user/google-login`, {
          access_token: tokenResponse.access_token,
        })

        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate("/dashboard");

      } catch (error) {
        console.log("Backend error:", error);
      }
    },
    onError: (err) => console.log("GOOGLE ERROR:", err),
  })

  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your
          journey today.
        </p>

        <div className="auth-card">
          <h1>Create an account</h1>
          <p className="small-top-text">
            Already have an account? <a href="/login">Log in</a>
          </p>
          <Form method="post" className="auth-fields">
            <input
              type="text"
              name="username"
              required
              placeholder="Enter your name"
              aria-label="Your Name"
              autoComplete="given-name"
            /> 
            
            {errors?.errors?.username && <span className="intro-error">{errors?.errors.username}</span>}
            
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              aria-label="Email"
              autoComplete="email"
            />

            {errors?.errors?.email && <span className="intro-error">{errors?.errors.email}</span>}
            
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Enter your password"
                aria-label="Password"
                autoComplete="new-password"
              /> 
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon width={20} />
                ) : (
                  <EyeSlashIcon width={20} />
                )}
              </button>
            </div> 
            
            {errors?.errors?.password && <span className="intro-error">{errors?.errors.password}</span>}

            <input type="hidden" name="_action" value="newUser" />
            <button type="submit" className="btn btn--dark">
              <span>Create Account</span>
              <UserPlusIcon width={18} />
            </button>
            <p className="continue-text">Or continue with</p>

            <div className="social-login">
              <button onClick={()=> GoogleLogin()} type="button" className="social-btn wide">
                <img src={googleIcon} alt="Google" />
                <span>Google</span>
              </button>

              <button onClick={()=>{ window.location.href = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_API_CLIENT_ID}&scope=user:email`;}} type="button" className="social-btn wide">
                <img src={githubIcon} alt="GitHub" />
                <span>GitHub</span>
              </button>
            </div>
          </Form>
        </div>
      </div>

      <img src={illustration} alt="Person sitting with money" width={600} />
    </div>
  );
};

export default Registration;
