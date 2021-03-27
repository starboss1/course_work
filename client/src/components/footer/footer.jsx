import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <div className="footer-basic footer mt-4 py-3">
            <footer>
                <div className="row">
                    <div className="col-2">
                        <p className="copyright">© 2021 KMADOC</p>
                    </div>
                    <div className="col-8">
                        <ul className="list-inline my-2">
                            <li className="list-inline-item"><Link to={{pathname: "/"}}>Головна</Link></li>
                            <li className="list-inline-item"><Link to={{pathname: "/about"}}>Про нас</Link></li>
                            <li className="list-inline-item"><Link to={{pathname: "/contacts"}}>Контакти</Link></li>
                        </ul>
                    </div>
                    <div className="col-2">
                        <p className="copyright">Back to top</p>
                    </div>
                </div>
               
            </footer>
        </div>
    )
}

export default Footer;
