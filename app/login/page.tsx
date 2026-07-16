"use client";

import { useActionState } from "react"
import "./style.css"
import { handleLogIn, LogInResponse } from "@/lib/actions/auth.action";

const Page = () => {

  const [state, formAction, isPending] = useActionState<LogInResponse | null, FormData>(handleLogIn, null);
  return (
    <div>
        <div className="login-page">
          <div className="login-card">
            <div className="login-header">
              <h1>Admin Panel</h1>
            </div>

            <form action={formAction} className="login-form">
              {state?.error && <p className="error" style={{ color: "red", marginBottom: "15px" }}>{state.error}</p>}
              <div className="input-group">
                <label>Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>

              <div className="login-options">
                <label className="remember">
                  <input type="checkbox" />
                  <span>Remember Me</span>
                </label>

                <a href="#">Forgot Password?</a>
              </div>

              <button type="submit" disabled={isPending} className="login-btn">
                {isPending ? "Checking Database..." : "Loading"}
              </button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Page