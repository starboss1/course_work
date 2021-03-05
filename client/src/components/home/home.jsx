import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import UserService from '../../services/user.service.js';

const Home = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content = (error.response && error.response.data) || error.message || error.toString();

                setContent(_content);
            }
        );
    }, []);

    // return (
    //     <div className="container">
    //         <header className="jumbotron">
    //             <h3>{content}</h3>
    //         </header>
    //     </div>
    // )
    return (
        <div>
            <div className="home-head text-center">
                <h2>KMADOC</h2>
                <h4>KMADOC допомагає зручно і швидко працювати з документами в одному місці</h4>
                <Link className="create-document" to={{pathname: "/createDocument"}}><button type="button" className="btn btn-primary btn block mt-5">Створити документ</button></Link>
            </div>

        </div>
    )
}

export default Home;
