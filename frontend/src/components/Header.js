import {NavLink, Link} from 'react-router-dom'
import {useState} from 'react'
import {connect} from 'react-redux'
import userActions from '../redux/actions/userActions'

const Header=({user})=>{
    return(
        <header>
            <h1>COZY</h1>
            <nav>
                <NavLink exact to='/'>HOME</NavLink>
                <NavLink to='/signin'>SIGN IN</NavLink>
                <NavLink to='/signup'>SIGN UP</NavLink>
                <NavLink to='/products'>STORE</NavLink>
            </nav>
        </header>
    )
}
const mapStateToProps =(state)=>{
    return{
        user:state.users.user
    }
}
const mapDispatchToProps={
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
