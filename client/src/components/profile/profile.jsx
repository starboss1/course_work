import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import documentImg from '../../assets/document.png';

import "./profile.css";
import userService from "../../services/user.service.js";
import documentService from '../../services/document.service.js';

const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [ownerDocuments, setOwnerDocuments] = useState();
    const [redactorDocuments, setRedactorDocuments] = useState();

    useEffect(() => {
        let mounted = true;
        userService.getUserDocuments()
        .then(response => mounted && (setOwnerDocuments([...response.data.ownerDocuments]) || setRedactorDocuments([...response.data.redactorDocuments])))
        .catch(error => console.log("error while get user documents", error));
    }, []);

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    const handleDeleteDocument = (documentId) => {
        documentService.deleteUserDocument(documentId)
            .then(response => window.location.reload())
            .catch(err => console.log('error while delete ', err));
    }

    const ownerDocumentList = ownerDocuments && ownerDocuments.map(elem => {
        return <div key={elem._id} className="col-xl-4 col-lg-4 col-md-6 col-sm-12  p-2 p-md-3 document-card">
            
                <div className="card">
                    <Link to={{pathname :`/document/${elem.documentId}`}}>
                        <img className="card-img-top" src={documentImg} alt="Document img"/>
                        <div className="card-body">
                            <h4 className="card-title">{elem.title}</h4>
                        </div>
                    </Link>
                    <button value={elem.documentId} className="btn btn-primary" onClick={(e) => handleDeleteDocument(e.target.value)}>Delete</button>
                </div>
            
            
            </div>
    });

    const redactorDocumentList = redactorDocuments && redactorDocuments.map(elem => {
        return <div key={elem._id} className="col-xl-4 col-lg-4 col-md-6 col-sm-12  p-2 p-md-3 document-card">
            
                <div className="card">
                    <Link to={{pathname :`/document/${elem.documentId}`}}>
                        <img className="card-img-top" src={documentImg} alt="Document img"/>
                        <div className="card-body">
                            <h4 className="card-title">{elem.title}</h4>
                        </div>
                    </Link>
                </div>
            
            
            </div>
    });

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> Профіль
                </h3>
            </header>
            <p>
                <strong>Токен:</strong>{" "}
                {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(
                    currentUser.accessToken.length - 20
                )}
            </p>
            <p>
                <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Пошта:</strong> {currentUser.email}
            </p>
            <strong>Ролі:</strong>
            <ul>
                {currentUser.roles &&
                    currentUser.roles.map((role, index) => (
                        <li key={index}>{role}</li>
                    ))}
            </ul>
            <h3>Мої документи</h3>
            <div className="row d-flex justify-content-start">{ownerDocumentList}</div>
            <h3>Доступні документи</h3>
            <div className="row d-flex justify-content-start">{redactorDocumentList}</div>
        </div>
    );
};

export default Profile;
