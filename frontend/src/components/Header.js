import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import ReactCircleModal from "react-circle-modal"
import Cart from "./Cart"
import styles from "../styles/MenuResponsive.module.css"
import { useState } from "react"

const Header = ({ loginUser, logOut, viewCart }) => {
  const [userMenu, setUserMenu] = useState(false)

  const menuHandler = (e) => {
    setUserMenu(!userMenu)
  }

  const outHandler = () => {
    logOut()
    setUserMenu(!userMenu)
  }

  if (loginUser) {
    var photo = loginUser.photo.includes("http")
      ? loginUser.photo
      : `https://cozydeco.herokuapp.com/${loginUser.photo}`
  }

  return (
    <header>
      <div className={styles.userMenu}>
        <div>
          {!loginUser && <i className="iconSocial fas fa-user fa-lg"></i>}
          {loginUser && (
            <div
              className="logoUser"
              style={{ backgroundImage: `url('${photo}')` }}
            ></div>
          )}
        </div>

        <div className={styles.iconsMenu} onClick={menuHandler}>
          {!userMenu ? (
            <img
              className={styles.iconItem}
              src="https://img.icons8.com/ios-filled/50/000000/menu--v1.png"
            />
          ) : (
            <img
              className={styles.iconItem}
              src="https://img.icons8.com/material-outlined/48/000000/cancel--v1.png"
            />
          )}
        </div>
      </div>
      <h1>COZY</h1>
      <div>
        <nav>
          <NavLink active exact to="/">
            HOME
          </NavLink>
          <NavLink active to="/products">
            STORE
          </NavLink>
          {!loginUser && (
            <NavLink
              active
              to="/signin"
              onClick={menuHandler}
              className={userMenu ? styles.menu1 : styles.itemResponsive}
            >
              SIGN IN
            </NavLink>
          )}
          {!loginUser && (
            <NavLink
              active
              to="/signup"
              onClick={menuHandler}
              className={userMenu ? styles.menu2 : styles.itemResponsive}
            >
              SIGN UP
            </NavLink>
          )}
          {loginUser && (
            <NavLink
              active
              onClick={outHandler}
              to="/"
              className={userMenu ? styles.menu1 : styles.itemResponsive}
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
