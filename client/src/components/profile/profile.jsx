import React from 'react'
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { user: currentUser } = useSelector(state => state.auth);

    if (!currentUser) {
        return <Redirect to="/login"/>
    }

    return (
        <div className="container">
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.username}</strong> Профіль
            </h3>
          </header>
          <p>
            <strong>Токен:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
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
              currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
        </div>
      );
}

export default Profile;