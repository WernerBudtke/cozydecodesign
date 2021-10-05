import { useState } from "react"
import { GoogleLogin } from "react-google-login"
// import { Link } from "react-router-dom"

const SignUp = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
  })

  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }
  console.log(user)

  const responseGoogle = (response) => {
    console.log(response)
  }

  const submitButton = (e) => {
    const { firstname, lastname, password, email } = user
    if (
      firstname === "" ||
      lastname === "" ||
      password === "" ||
      email === ""
    ) {
      alert("Empty fields")
    }
  }

  return (
    <main className="signup-main">
      <div className="box">
        <div>
          <h1>Sign Up</h1>
        </div>
        <div>
          <div className="group">
            <input
              className="inputMaterial"
              type="text"
              required
              onChange={inputHandler}
              name="firstname"
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className="form-label">Firstname</label>
          </div>
          <div className="group">
            <input
              className="inputMaterial"
              type="text"
              required
              onChange={inputHandler}
              name="lastname"
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className="form-label">Lastname</label>
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
            <input className="inputMaterial" type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className="form-label">Avatar</label>
          </div>
          <button type="submit" onClick={submitButton}>
            Sign Up
          </button>
          <p>Or</p>
          <div className="googleButton">
            <GoogleLogin
              clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
              buttonText="Sign up"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
        <div className="footer-box">
          <p className="footer-text">You have an account? Sign in now!</p>
        </div>
      </div>
    </main>
  )
}

export default SignUp
