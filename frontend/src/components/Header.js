import {NavLink, Link} from 'react-router-dom'
import {useState} from 'react'
import {connect} from 'react-redux'
import userActions from '../redux/actions/userActions'

const Header=({token, logOut, firstName})=>{
    return(
        <header>
            <h1>COZY</h1>
            <nav>
                <NavLink exact to='/'>HOME</NavLink>
                {!token && <NavLink to='/signin'>SIGN IN</NavLink>}
                {!token && <NavLink to='/signup'>SIGN UP</NavLink>}
                <NavLink to='/products'>STORE</NavLink>
            </nav>
                {token && <p onClick={logOut}>Log Out</p>}
                {firstName && <p>{firstName}</p>}
        </header>
    )
}
const mapStateToProps =(state)=>{
    return{
        token:state.users.token,
        firstName: state.users.firstName
    }
}
const mapDispatchToProps={
    logOut: userActions.logOut
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)