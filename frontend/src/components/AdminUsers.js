import { connect } from 'react-redux'
import '../styles/Admin.css'
import adminActions from '../redux/actions/adminActions'
import { useEffect, useState } from 'react'

const AdminUsers = ({getUsers, manageAdmin, loginUser}) => {
const [users, setUsers] = useState([])
const [render, setRender] = useState(false)

    useEffect(() => {
        const res = async () => {
            let response = await getUsers()
            if (response.success) {
                setUsers(response.response)
            } else {
                console.log(response)
            }
        }
        res()
    }, [render])

    const giveRol = async (e) => {
        console.log(typeof e.target.dataset.admin)
        let action = e.target.dataset.admin === 'true'
        let response = await manageAdmin(e.target.id, loginUser.token, action)
        if (response.success) {
            setRender(!render)
        } else {
            alert('error')
        }
    }

    return (
        <div>
            <h2>User list</h2>
            <div className="userContainer">
                {users.map((user) => <p onClick={giveRol} data-admin={user.admin} id={user._id} key={user.eMail}>{user.eMail + ' is admin ' + user.admin}</p>)}
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        loginUser:state.users.user,
    }
}

const mapDispatchToProps = {
    getUsers: adminActions.getUsers,
    manageAdmin: adminActions.manageAdmin
}

export default  connect(mapStateToProps, mapDispatchToProps)(AdminUsers)
