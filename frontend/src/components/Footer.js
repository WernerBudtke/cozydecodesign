import { Link } from 'react-router-dom'
import styles from "../styles/Footer.module.css";

const Footer=()=>{
    return(
        <footer className={styles.footer}>
            <div className={styles.infoProduct}>
                <h3>Categories</h3>
                <Link to="/products/Kitchenware"><p>Kitchenware</p></Link>
                <Link to="/products/Bathroom"><p>Bathroom</p></Link>
                <Link to="/products/Decor"><p>Decor</p></Link>
            </div>
            <div className={styles.infoService}>
                <h3>Customer Service</h3>
                <p>Shipping</p>
                <p>Payment Methods</p>
                <p>Changes and returns</p>
            </div>
            <div className={styles.infoContact}>
                <h3>Contact</h3>
                <div className={styles.iconContact}>
                    <i className="fas fa-envelope" className={styles.iconSocial}></i>
                    <p>cozydecodesign@gmail.com</p>
                </div>
                <div className={styles.iconContact}>
                    <i className="fas fa-phone-alt" className={styles.iconSocial}></i>
                    <p>+54 11 6789 8270</p>
                </div>
                <div className={styles.socialNetworks}>
                    <a href="https://www.facebook.com/" target="_blank">
                        <i className="fab fa-facebook-square fa-2x" className={styles.iconSocial}></i>
                    </a> 
                    <a href="https://www.instagram.com/" target="_blank">
                        <i className="fab fa-instagram-square fa-2x" className={styles.iconSocial}></i>
                    </a> 
                    <a href="https://www.whatsapp.com/" target="_blank">
                        <i className="fab fa-whatsapp-square fa-2x" className={styles.iconSocial}></i>
                    </a>
                </div>
            </div>
        </footer>
    )
}
export default Footer