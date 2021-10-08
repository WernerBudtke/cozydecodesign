import "../styles/Admin.css"
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import userActions from '../redux/actions/userActions'
import AdminUsers from "../components/AdminUsers"
import AdminStock from "../components/AdminStock"
import AdminStats from "../components/AdminStats"

const Admin = ({loginUser}) => {
    const [component, setComponent] = useState({screen: ''})

    useEffect(() => {
        document.title = 'COZY | Admin Dashboard'
    }, [])

    return (
        <main className="adminMain">
            <div>
                <div className="topInfo">
                    <div onClick={() => setComponent({screen: 'statistics'})}>
                        <i className="fas fa-money-bill-wave fa-2x"></i>
                        <h4>Total sales: 23</h4>
                    </div>
                    {loginUser.owner && <div onClick={() => setComponent({screen: 'user'})}>
                        <i className="far fa-user fa-2x"></i>
                        <h4>Total users: 43</h4>
                    </div>}
                    <div onClick={() => setComponent({screen: 'stock'})}>
                        <i className="fas fa-cart-plus fa-2x"></i>
                        <h4>Total stock: 65</h4>
                    </div>
                </div>
                <hr />
                <div className="midInfo">
                    <div>
                        {component.screen === 'statistics' && <AdminStats />}
                        {component.screen === 'user' && <AdminUsers />}
                        {component.screen === 'stock' && <AdminStock />}
                    </div>
                </div>
            </div>
        </main>
    )
}

const mapStateToProps = (state) =>{
    return{
        loginUser:state.users.user,
    }
}

const mapDispatchToProps = {
    logFromSession: userActions.logFromSession,
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
