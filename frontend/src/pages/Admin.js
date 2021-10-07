import "../styles/Admin.css"
import { connect } from 'react-redux'
import { useEffect } from 'react'
import userActions from '../redux/actions/userActions'
import adminActions from '../redux/actions/adminActions'
import AdminUsers from "../components/AdminUsers"

const Admin = ({getUsers, loginUser}) => {


    useEffect(() => {
        document.title = 'COZY - Admin Dashboard'
    }, [])

    const getUsersButton = async () => {
        let response = await getUsers()
        console.log(response)
    }

    return (
        <main className="adminMain">
            <div>
                <div className="topInfo">
                    <div>
                        <i class="fas fa-money-bill-wave fa-2x"></i>
                        <h4>Total sales: 23</h4>
                    </div>
                    <div>
                        <i class="far fa-user fa-2x"></i>
                        <h4>Total users: 43</h4>
                    </div>
                    <div>
                        <i class="fas fa-cart-plus fa-2x"></i>
                        <h4>Total stock: 65</h4>
                    </div>
                </div>
                <hr />
                <div className="midInfo">
                    <div className="searchBar">
                        <div>
                            <button onClick={getUsersButton}>Ver usuarios</button>
                            <button>Ver stock</button>
                            <button>Cargar productos</button>
                        </div>
                    </div>
                    <div>
                        <AdminUsers />
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
    getUsers: adminActions.getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
