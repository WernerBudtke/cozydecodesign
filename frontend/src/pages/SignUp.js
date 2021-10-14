import { useState, useEffect } from "react"
import { GoogleLogin } from "react-google-login"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import "../styles/SignUp.css"
import Header from "../components/Header"

const SignUp = ({ history, signUp }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    eMail: "",
    photo: "",
    admin: false,
    google: false,
  })
  const [renderError, setRenderError] = useState({})
  const errorsInput = {
    firstName: null,
    lastName: null,
    eMail: null,
    password: null,
    emptyFields: null,
  }

  useEffect(() => {
    document.title = "COZY | Sign Up"
  }, [])

  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]:
        e.target.name === "photo" ? e.target.files[0] : e.target.value,
    })
  }

  const responseGoogle = async (response) => {
    let user = {
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      password: response.profileObj.googleId,
      photo: response.profileObj.imageUrl,
      eMail: response.profileObj.email,
      google: true,
      admin: false,
    }
    const res = await signUp(user)
    if (res.success) {
      history.push("/")
    } else {
      setRenderError({ emailGoogle: "That google account is already in use" })
    }
  }

  const submitHandler = async () => {
    const fd = new FormData()
    fd.append("firstName", user.firstName)
    fd.append("lastName", user.lastName)
    fd.append("password", user.password)
    fd.append("eMail", user.eMail)
    fd.append("photo", user.photo)
    fd.append("admin", user.admin)
    fd.append("google", user.google)
    if (Object.values(user).some((value) => value === "")) {
      setRenderError({ emptyFields: "There cannot be empty fields" })
    } else {
      const response = await signUp(fd)
      if (response.success) {
        history.push("/")
      } else {
        if (typeof response.response === 'string') {
          setRenderError({...renderError, eMail: 'Email already in use'})
        } else {
          response.response.forEach((error) => {
            errorsInput[error.context.label] = error.message
          })
          setRenderError(errorsInput)
        }
      }
    }
  }
  console.log(user)

  return (
    <>
      <Header />
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
              <div>
                {renderError.firstName && (
                  <p className="inputError">{renderError.firstName}</p>
                )}
              </div>
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
              <div>
                {renderError.lastName && (
                  <p className="inputError">{renderError.lastName}</p>
                )}
              </div>
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
              <div>
                {renderError.password && (
                  <p className="inputError">{renderError.password}</p>
                )}
              </div>
            </div>
            <div className="group">
              <input
                type="text"
                onChange={inputHandler}
                name="eMail"
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Email</label>
              <div>
                {renderError.eMail && (
                  <p className="inputError">{renderError.eMail}</p>
                )}
              </div>
            </div>
            <div className="group">
              <input type="file" onChange={inputHandler} name="photo" />
              <label>Avatar</label>
            </div>
            <button type="submit" onClick={submitHandler}>
              Sign Up
            </button>
            <p>Or</p>
            <div className="googleButton">
              <GoogleLogin
                clientId="825531110504-0ffdha8bsmqln05l9dtqhst3l984smsm.apps.googleusercontent.com"
                buttonText="Sign up"
                onSuccess={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
          <div className="errorContainer">
            {<p>{renderError.emptyFields}</p>}
            {<p>{renderError.emailGoogle}</p>}
          </div>
          <div className="footer-box">
            <Link to="/signin">You have an account? Sign in now!</Link>
          </div>
        </div>
      </main>
    </>
  )
}

const mapDispatchToProps = {
  signUp: userActions.signUp,
}

export default connect(null, mapDispatchToProps)(SignUp)
