import { useState } from "react"
import { GoogleLogin } from "react-google-login"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import toast from "react-hot-toast"

const SignUp = (props) => {
  const [user, setUser] = useState({ firstName: "", lastName: "", password: "", eMail: "", photo: "", admin: false, google: false })
  const [renderError, setRenderError] = useState({error: ''})

  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.name === "photo" ? e.target.files[0] : e.target.value,
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
      admin: false
    }
    const res = await props.signUp(user)
    if (res.success) {
      toast.success('Account created!')
      props.history.push("/")
    } else {
      res.response === "eMail already in use" && toast.error('Email already in use')
    }
  }

  let myErrors = {
    firstName: 'Firstname must contain at least 2 characters, only letters and cannot exceed 25 characteers and cann',
    lastName: 'Lastname must contain at least 2 characters and cannot exceed 25 characteers',
    eMail: renderError.error.includes('eMail already in use') ? "Email already in use!" : "Email must be a valid one, for example jwb@gmail.com",
    password: "The password must contain at least 6 characters",
  }

  let myErrorsKeys = Object.keys(myErrors).filter(key => renderError.error.includes(key)) 
    const handleError = (string) =>{
      return renderError.error.includes(string) ? 'fieldError' : ''
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
      toast.error('Empty fields')
    } else {
      const response = await props.signUp(fd)
      if (response.success) {
        toast.success('Account created!')
        props.history.push("/")
      } else {
        toast.error('Oops! Check the errors.')
        setRenderError({error: response.response})
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
            <div>
              {renderError.error.includes('firstName') && <p className="inputError">{myErrors.firstName}</p>}
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
              {renderError.error.includes('lastName') && <p className="inputError">{myErrors.lastName}</p>}
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
              {renderError.error.includes('password') && <p className="inputError">{myErrors.password}</p>}
            </div>
          </div>
          <div className="group">
            <input
              type="text"
              onChange={inputHandler}
              name="eMail"
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Email</label>
            <div>
              {renderError.error.includes('eMail') && <p className="inputError">{myErrors.eMail}</p>}
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
              clientId="825531110504-5if5ceqkaqcvcu2dppipo8q3j7hvnn9k.apps.googleusercontent.com"
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
