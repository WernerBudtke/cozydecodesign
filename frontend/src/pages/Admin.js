import styles from '../styles/Admin.module.css'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import userActions from '../redux/actions/userActions'
import AdminUsers from "../components/AdminUsers"
import AdminStock from "../components/AdminStock"
import AdminStats from "../components/AdminStats"
import AdminGuide from "../components/AdminGuide"

const Admin = ({loginUser}) => {
    const [component, setComponent] = useState({screen: "adminGuide"})

    useEffect(() => {
        document.title = 'COZY | Admin Dashboard'
    }, [])

    return (
        <main className={styles.adminMain}>
            <div>
                <div className={styles.topInfo}>
                    <div onClick={() => setComponent({screen: 'statistics'})}>
                    <i className="fas fa-sort-amount-up fa-2x"></i>
                        <h2>Statistics</h2>
                    </div>
                    {loginUser.owner && <div onClick={() => setComponent({screen: 'user'})}>
                        <i className="far fa-user fa-2x"></i>
                        <h2>Users list</h2>
                    </div>}
                    <div onClick={() => setComponent({screen: 'stock'})}>
                        <i className="fas fa-cart-plus fa-2x"></i>
                        <h2>Manage Stock</h2>
                    </div>
                </div>
                <hr />
                <div className={styles.midInfo}>
                        {component.screen === 'adminGuide' && <AdminGuide />}
                        {component.screen === 'statistics' && <AdminStats />}
                        {component.screen === 'user' && <AdminUsers />}
                        {component.screen === 'stock' && <AdminStock />}
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
