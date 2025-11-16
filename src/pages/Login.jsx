import { useState } from "react";
import { Form } from "react-router-dom";
import { EyeIcon, EyeSlashIcon, UserPlusIcon } from "@heroicons/react/24/solid";

import googleIcon from "../assets/google.jpg";
import githubIcon from "../assets/github.jpg";

// assets
import illustration from "../assets/illustration.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="intro">
      <div>
        <h1>Welcome Back</h1>
        <p>Log in to manage your budgets and track your expenses.</p>

        <div className="auth-card">
          <h1>Log in</h1>
          <p className="small-top-text">
            Don’t have an account? <a href="/">Create one</a>
          </p>

          <Form method="post" className="auth-fields">
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              aria-label="Email"
              autoComplete="email"
            />

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Enter your password"
                aria-label="Password"
                autoComplete="current-password"
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

            <input type="hidden" name="_action" value="loginUser" />

            <button type="submit" className="btn btn--dark">
              <span>Login</span>
              <UserPlusIcon width={18} />
            </button>

            <p className="continue-text">Or continue with</p>

            <div className="social-login">
              <button type="button" className="social-btn wide">
                <img src={googleIcon} alt="Google" />
                <span>Google</span>
              </button>

              <button type="button" className="social-btn wide">
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

export default Login;
