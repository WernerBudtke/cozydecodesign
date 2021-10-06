import { useState } from "react"
import { GoogleLogin } from "react-google-login"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"

const SignUp = (props) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    eMail: "",
    photo: "",
    admin: false,
    google: false,
  })

  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]:
        e.target.name === "picture" ? e.target.files[0] : e.target.value,
    })
  }

  const responseGoogle = (response) => {
    console.log(response)
  }

  const submitHandler = async () => {
    if (Object.values(user).some((value) => value === "")) {
      alert("Empty fields")
    } else {
      try {
        const response = await props.signUp(user)
        if (response.data.success) {
          alert("Account created")
          return false
        } else {
          throw new Error(response.data.response)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <main className="signup-main">
      <div className="box">
        <h1>Sign Up</h1>
        <div>
          <div className="group">
            <input
              type="text"
              required
              onChange={inputHandler}
              name="firstName"
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Firstname</label>
          </div>
          <div className="group">
            <input
              type="text"
              required
              onChange={inputHandler}
              name="lastName"
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Lastname</label>
          </div>
          <div className="group">
            <input
              type="password"
              required
              onChange={inputHandler}
              name="password"
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Password</label>
          </div>
          <div className="group">
            <input type="text" required onChange={inputHandler} name="eMail" />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Email</label>
          </div>
          <div className="group">
            <input type="file" required onChange={inputHandler} name="photo" />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Avatar</label>
          </div>
          <button type="submit" onClick={submitHandler}>
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
          <Link to="/signin">You have an account? Sign in now!</Link>
        </div>
      </div>
    </main>
  )
}

const mapDispatchToProps = {
  signUp: userActions.signUp,
}

export default connect(null, mapDispatchToProps)(SignUp)
