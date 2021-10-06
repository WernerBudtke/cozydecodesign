import { useState } from "react"
import { GoogleLogin } from "react-google-login"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import toast from "react-hot-toast"

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
  const [renderError, setRenderError] = useState({error: ''})

  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.name === "photo" ? e.target.files[0] : e.target.value,
    })
  }

  const responseGoogle = (response) => {
    // console.log(response)
  }

  let myErrors = {
    firstName: 'Firstname field cant be empty, must contain at least 2 characters and cannot exceed 25 characteers',
    lastName: 'Lastname field cant be empty, must contain at least 2 characters and cannot exceed 25 characteers',
    eMail: renderError.error.includes('eMail already in use') ? "Email already in use!" : "Email must be a valid one, for example jwb@gmail.com",
    password: "The password field cant be empty, and must contain at least 8 characters",
    photo: "You need to choose a picture"
  }
  let myErrorsKeys = Object.keys(myErrors).filter(key => renderError.error.includes(key)) 
    const handleError = (string) =>{
      return renderError.error.includes(string) ? 'fieldError' : ''
    }
    console.log(renderError)
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
        alert('account created')
      } else {
        console.log(response)
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
            {renderError.error.includes('firstName') && <p>{myErrors.firstName}</p>}
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
            {renderError.error.includes('lastName') && <p>{myErrors.lastName}</p>}
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
            {renderError.error.includes('password') && <p>{myErrors.password}</p>}
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
            {renderError.error.includes('eMail') && <p>{myErrors.eMail}</p>}
          </div>
          <div className="group">
            <input type="file" onChange={inputHandler} name="photo" />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Avatar</label>
            {renderError.error.includes('photo') && <p>{myErrors.photo}</p>}
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
