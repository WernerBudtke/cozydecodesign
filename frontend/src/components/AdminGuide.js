import styles from '../styles/Admin.module.css'

const AdminGuide = () => {
    return (
        <div className={styles.guideContainer}>
            <div>
                <h1>Admin Control Panel.</h1>
                <hr />
                <div>
                    <h3>In Statistics, you can see the total sales and the total profit.</h3>
                    <h3>If you're the owner, you have the tab "user list" to give the role of administrator to a user.</h3>
                    <h3>In Manage Stock, any user with the administrator role will be able to edit the stock and information of any product.</h3>
                </div>
            </div>
            <div>
                <h1 className={styles.brand}>COZY</h1>
            </div>
        </div>
    )
}

export default AdminGuide
