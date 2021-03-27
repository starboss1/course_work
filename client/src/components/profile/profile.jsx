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
            {/* <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> Профіль
                </h3>
            </header> */}
            <div className="text-center">
                <svg
                    width="200"
                    height="200"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="100" cy="100" r="99.5" stroke="black" />
                    <path d="M95.84 57V141H102.44V57H95.84Z" fill="black" />
                </svg>
            </div>
            <div className="text-center display-4 my-2">
                <span>{currentUser.username}</span>
            </div>

            <div className="border">
                <div className="py-4 px-4">
                    <div className="form-group">
                        <span className="mr-2 font-weight-bold">
                            Ім'я: 
                        </span>
                        <span> {currentUser.username}</span>
                    </div>
                    <div className="form-group">
                        <span className="mr-2 font-weight-bold">
                            Пошта 
                        </span>
                        <span> {currentUser.email}</span>
                    </div>
                    <div className="form-group">
                        <span className="mr-2 font-weight-bold">
                            Роль: 
                        </span>
                        <span> {currentUser.roles.map((role, index) => (
                            <span className="mr-1">{role === 'ROLE_USER'? 'Користувач': ''}</span>
                        ))}</span>
                    </div>   
                </div>
            </div>
            <h3>Мої документи</h3>
            <div className="row d-flex justify-content-start">{ownerDocumentList}</div>
            <h3>Доступні документи</h3>
            <div className="row d-flex justify-content-start">{redactorDocumentList}</div>
        </div>
    );
};

export default Profile;
