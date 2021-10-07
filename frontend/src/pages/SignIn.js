import { useState , useEffect} from "react"
import { GoogleLogin } from "react-google-login"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"

const SignIn = ({history,logIn}) => {

  useEffect(()=>{
    document.title='COZY | Sign In'
  },[])

  const [user, setUser] = useState({
    password: "",
    eMail: "",
  })
  const [error, setError] = useState('')

  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const responseGoogle = async (response) => {
    let user = {
      eMail: response.profileObj.email,
      password: response.profileObj.googleId,
      google: true,
    }
    let res = await logIn(user)
    if (res.success) {
        history.push('/')
    } else {
      res.response === 'Invalid username or pass' && setError('That google account does not exist')
    }
}

  const submitHandler = async () => {
    if (Object.values(user).some((value) => !value)) {
      return setError('Fill the empty fields')
    }
    const response = await logIn(user)
      if (response.success) {
        history.push("/")
      } else {
        setError(response.response)
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
            <input type="text" required onChange={inputHandler} name="eMail" />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Email</label>
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
          <button type="submit" onClick={submitHandler}>
            Sign In
          </button>
          <p>Or</p>
          <div className="googleButton">
            <GoogleLogin
              clientId="825531110504-5if5ceqkaqcvcu2dppipo8q3j7hvnn9k.apps.googleusercontent.com"
              buttonText="Sign in"
              onSuccess={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
        <div className="errorContainer">
          {<p>{error}</p>}
        </div>|
        <div className="footer-box">
          <Link to="/signup">You don't have an account? Sign up now!</Link>
        </div>
      </div>
    </main>
    
  )
}

const mapDispatchToProps = {
  logIn: userActions.logIn,
}

export default connect(null, mapDispatchToProps)(SignIn)
