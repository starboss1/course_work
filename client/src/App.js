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
            <div>
                <nav className="navbar navbar-expand navbar-dark navbar-custom">
                    <Link to={"/"} className="navbar-brand">KMADOC</Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">Home</Link>
                        </li>
                        {currentUser && (
                        <li className="nav-item">
                            <Link to={"/user"} className="nav-link">
                            User
                            </Link>
                        </li>
                        )}
                    </div>


                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                            {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                            Вийти
                            </a>
                        </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                            Увійти
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
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
                <Footer/>
            </div>
        </Router>
    )


}

export default App;

// import React, {useEffect} from 'react';
// import Quill from 'quill';
// import 'quill/dist/quill.bubble.css';
// import Sharedb from 'sharedb/lib/client';
// import richText from 'rich-text';

// // Registering the rich text type to make sharedb work
// // with our quill editor
// Sharedb.types.register(richText.type);


// // Connecting to out socket server

// const socket = new WebSocket('ws://127.0.0.1:8080');
// const connection = new Sharedb.Connection(socket);

// // Querying for out document

// const doc = connection.get('documents', 'firstDocument');

// function App() {
//   useEffect(() => {
//     doc.subscribe((err) => {
//       if(err) throw err;

//       const toolbarOptions = ['bold', 'italic', 'underline' , 'strike', 'align'];
//       const options = {
//         theme: 'bubble',
//         modules: {
//           toolbar: toolbarOptions,
//         },
//       };

//       let quill= new Quill('#editor', options);
//       /**
//        * On Initialising if data is present in server
//        * Updaing its content to editor
//        */
//       quill.setContents(doc.data);

//       /**
//        * On Text change publishing to our server
//        * so that it can be broadcasted to all other clients
//        */
//       quill.on('text-change', (delta, oldDelta, source) => {
//         if(source !== 'user') return;
//         doc.submitOp(delta, {source: quill});
//       });

//       /** listening to changes in the document
//        * that is coming from our server
//        */
//       doc.on('op', (op, source) => {
//         if(source === quill) return;
//         quill.updateContents(op);
//       });
//     });

//     return () => {
//       connection.close();
//     };
//   }, []);

//   return (
//     <div style={{margin: '5%', border: '1px solid'}}>
//       <div id='editor'></div>
//     </div>
//   );
// }

// export default App;