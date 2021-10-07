import { Link } from 'react-router-dom'

const Footer=()=>{
    return(
        <footer>
            <div className="infoProduct">
                <h3>Categories</h3>
                <Link to="/products/kitchenware"><p>Kitchenware</p></Link>
                <Link to="/products/bathroom"><p>Bathroom</p></Link>
                <Link to="/products/decor"><p>Decor</p></Link>
            </div>
            <div className="infoService">
                <h3>Customer Service</h3>
                <p>Shipping</p>
                <p>Payment Methods</p>
                <p>Changes and returns</p>
            </div>
            <div className="infoContact">
                <h3>Contact</h3>
                <div className="iconContact">
                    <i className="iconSocial fas fa-envelope"></i>
                    <p>cozydecodesign@gmail.com</p>
                </div>
                <div className="iconContact">
                    <i className="iconSocial fas fa-phone-alt"></i>
                    <p>+54 11 6789 8270</p>
                </div>
                <div className="socialNetworks">
                    <a href="https://www.facebook.com/" target="_blank">
                        <i className="iconSocial fab fa-facebook-square fa-2x"></i>
                    </a> 
                    <a href="https://www.instagram.com/" target="_blank">
                        <i className="iconSocial fab fa-instagram-square fa-2x"></i>
                    </a> 
                    <a href="https://www.whatsapp.com/" target="_blank">
                        <i className="iconSocial fab fa-whatsapp-square fa-2x"></i>
                    </a>
                </div>
            </div>
        </footer>
    )
}
export default Footer