
const Footer=()=>{
    return(
        <footer>
            <div className="infoProduct">
                <h3>Categories</h3>
                <p>Bazaar</p>
                <p>Illumination</p>
                <p>Decor</p>
            </div>
            <div className="infoService">
                <h3>Customer Service</h3>
                <p>Shipping</p>
                <p>Payment Methods</p>
                <p>Changes and returns</p>
            </div>
            <div className="infoContact">
                <h3>Contact</h3>
                <i className="iconSocial fas fa-envelope">  cozydecodesign@gmail.com</i>
                <i className="iconSocial fas fa-phone-alt"> +54 11 6789 8270
                </i>
                
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