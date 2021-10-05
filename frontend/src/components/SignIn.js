import { useState } from "react"
import { GoogleLogin } from "react-google-login"

const SignIn = () => {
  const [user, setUser] = useState({
    password: "",
    email: "",
  })

  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const responseGoogle = (response) => {
    console.log(response)
  }

  const submitButton = () => {
    const { password, email } = user
    if (password === "" || email === "") {
      alert("Empty fields")
    }
  }

  return (
    <main className="signin-main">
      <div className="box">
        <div>
          <h1>Sign In</h1>
        </div>
        <div>
          <div className="group">
            <input
              className="inputMaterial"
              type="text"
              required
              onChange={inputHandler}
              name="email"
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className="form-label">Email</label>
          </div>
          <div className="group">
            <input
              className="inputMaterial"
              type="password"
              required
              onChange={inputHandler}
              name="password"
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className="form-label">Password</label>
          </div>
          <button type="submit" onClick={submitButton}>
            Sign In
          </button>
          <p>Or</p>
          <div className="googleButton">
            <GoogleLogin
              clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
              buttonText="Sign in"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
        <div className="footer-box">
          <p className="footer-text">You don't have an account? Sign up now!</p>
        </div>
      </div>
    </main>
  )
}

export default SignIn
