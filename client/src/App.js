import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import Login from "./components/login/login.jsx";
import Register from "./components/register/register.jsx";
import Home from "./components/home/home.jsx";
import Profile from "./components/profile/profile.jsx";
import BoardUser from "./components/boardUser/boardUser.jsx";
import Footer from './components/footer/footer.jsx';
import Document from './components/document/document.jsx'

import { logout } from './actions/auth.js';
import { clearMessage } from './actions/message.js';

import { history } from './helpers/history.js';

const App = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
      history.listen((location) => {
          dispatch(clearMessage()); // clear message when changing location
      });
    }, [dispatch]);

    const logOut = () => {
        dispatch(logout());
    };

    return(
        <Router history={history}>
            <div className="page-container">
                <div className="content-wrap">
                <nav className="navbar navbar-expand navbar-dark navbar-custom">
                    <Link to={"/"} className="navbar-brand">KMADOC</Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link nav-link-white">Home</Link>
                        </li>
                    </div>


                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link nav-link-white">
                            {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link nav-link-white" onClick={logOut}>
                            Вийти
                            </a>
                        </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link nav-link-white">
                            Увійти
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link nav-link-white">
                            Реєстрація
                            </Link>
                        </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/profile" component={Profile} />
                        <Route path="/user" component={BoardUser} />
                        <Route exact path="/document/:documentId" component={Document} />
                    </Switch>
                </div>
                </div>
                <Footer/>
            </div>
        </Router>
    )


}

export default App;