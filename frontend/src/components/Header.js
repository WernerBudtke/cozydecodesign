import {NavLink, Link} from 'react-router-dom'
import {useState} from 'react'
import {connect} from 'react-redux'
import userActions from '../redux/actions/userActions'

const Header=({user})=>{
    return(
        <header>
            <h1>COZY</h1>
            <div className="navContainer">
                <nav>
                    <NavLink active exact to='/'>HOME</NavLink>
                    <NavLink active to='/signin'>SIGN IN</NavLink>
                    <NavLink active to='/signup'>SIGN UP</NavLink>
                    <NavLink active to='/products'>STORE</NavLink>
                </nav>  
            </div>
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