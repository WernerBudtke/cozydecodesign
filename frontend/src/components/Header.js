import { Link, NavLink } from "react-router-dom"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import ReactCircleModal from "react-circle-modal"
import Cart from "./Cart"
import { useState } from "react"

const Header = ({ loginUser, logOut, viewCart }) => {

  const [userMenu, setUserMenu] = useState(false)

  const viewopHandler = () => {
    setUserMenu(!userMenu)
  }

  const outHandler = () => {
    logOut()
    setUserMenu(!userMenu)
  }

  if (loginUser) {
    var photo = loginUser.photo.includes("http")
      ? loginUser.photo
      : `http://localhost:4000/${loginUser.photo}`
  }

const userNull=<div>
                  <i className="iconSocial fas fa-user fa-lg" onClick={viewopHandler}></i>
                  {userMenu && <div className='signcont'>
                  <Link className='sign' to='/signin'>SIGN IN</Link>
                  <Link className='sign 'to='/signup'>SIGN UP</Link>
                  </div>}
              </div>
             

const userSignIn=<div>
                    <div className='logoUser' onClick={viewopHandler} style={{ backgroundImage: `url('${photo}')` }}></div>
                    {userMenu && <Link className='signcont' to='/' onClick={outHandler}>SIGN OUT</Link>}  
                  </div>  
   
  return (
    <header>
        <div>
          {!loginUser? userNull : userSignIn}
        </div>
      <h1>COZY</h1>
      <div>
        <nav>
          <NavLink exact to="/">
            HOME
          </NavLink>
          <NavLink to="/products">
            STORE
          </NavLink>
          {!loginUser && (
            <NavLink
              to="/signin"
            >
              SIGN IN
            </NavLink>
          )}
          {!loginUser && (
            <NavLink
              to="/signup"
            >
              SIGN UP
            </NavLink>
          )}
          {loginUser && (
            <NavLink
              onClick={outHandler}
              to="/"
            >
              SIGN OUT
            </NavLink>
          )}
          {loginUser && loginUser.admin && <NavLink to="/admin">ADMIN</NavLink>}
          {!viewCart && (
            <ReactCircleModal
              style={{
                padding: "0",
              }}
              backgroundColor="#61605e8a"
              toogleComponent={(onClick) => (
                <i
                  onClick={onClick}
                  className="iconSocial fas fa-shopping-cart fa-1x"
                ></i>
              )}
              offsetX={0}
              offsetY={0}
            >
              {(onClick) => <Cart onClickHandler={onClick} />}
            </ReactCircleModal>
          )}
        </nav>
      </div>
    </header>
  )
}
const mapStateToProps = (state) => {
  return {
    loginUser: state.users.user,
  }
}
const mapDispatchToProps = {
  logOut: userActions.logOut,
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
