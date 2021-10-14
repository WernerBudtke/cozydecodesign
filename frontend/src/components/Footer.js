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
                <div className={styles.iconResponsive}>
                   <div  className={styles.iconSocial} >
                <i className="fas fa-envelope fa-lg"></i>
                  <p>cozydecodesign@gmail.com</p>
                </div>
                <div className={styles.iconSocial}>
                <i className="fas fa-phone-square-alt fa-lg"></i>
                    <p>+54 11 6789 8270</p>
                </div> 
                </div>
                
                <div className={styles.iconSocial}>
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className={styles.iconFooter}>
                    <i className="fab fa-facebook-square fa-lg"></i>
                    </a> 
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className={styles.iconFooter}>
                    <i className="fab fa-instagram-square fa-lg"></i>                    
                    </a> 
                    <a href="https://www.whatsapp.com/" target="_blank" rel="noreferrer" className={styles.iconFooter}>
                    <i className="fab fa-whatsapp-square fa-lg"></i>
                    </a>
                </div>
            </div>
        </footer>
    )
}
export default Footer