import { NavLink, Link } from "react-router-dom"
import { useState } from "react"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import ReactCircleModal from "react-circle-modal"
import Cart from "./Cart"

const Header = ({ loginUser, logOut }) => {
  const outHandler = () => {
    logOut()
  }
  return (
    <header>
      {loginUser && (
        <div>
          <div
            style={{
              backgroundImage: `url('${loginUser.photo}')`,
              width: "8vh",
              height: "8vh",
            }}
          ></div>
        </div>
      )}
      <h1>COZY</h1>
      <div className="navContainer">
        <nav>
          <NavLink active exact to="/">
            HOME
          </NavLink>
          <NavLink active to="/products">
            STORE
          </NavLink>
          {!loginUser && (
            <NavLink active to="/signin">
              SIGN IN
            </NavLink>
          )}
          {!loginUser && (
            <NavLink active to="/signup">
              SIGN UP
            </NavLink>
          )}
          {loginUser && (
            <NavLink active onClick={outHandler} to="/">
              LOGOUT
            </NavLink>
          )}
        </nav>
      </div>
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
        // Optional fields and their default values
        offsetX={0}
        offsetY={0}
      >
        {(onClick) => <Cart onClickHandler={onClick} />}
      </ReactCircleModal>
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
