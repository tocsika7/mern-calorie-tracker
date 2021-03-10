import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Alert } from 'react-bootstrap';
import { clearAfterUserUpdate, updateUser } from '../../actions/userActions';

const UserInfoUpdateForm = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading: userInfoLoading, error, userInfo } = userProfile;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, userUpdateError, userUpdateMessage } = userUpdate;

  const [updateEmail, setUpdateEmail] = useState(userInfo.email);
  const [updateUsername, setUpdateUsername] = useState(userInfo.username);
  const [updatePassword, setUpdatePassword] = useState('');

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        username: updateUsername,
        email: updateEmail,
        password: updatePassword,
      })
    );

    setTimeout(() => {
      dispatch(clearAfterUserUpdate());
    }, 2000);
  };

  return (
    <>
      <h3>Profil Frissítése</h3>
      {userInfoLoading ? (
        <Alert variant='primary'>Töltés...</Alert>
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <>
          {loading && <Alert variant='primary'>Töltés...</Alert>}
          {userUpdateError && <Alert variant='danger'>{userUpdateError}</Alert>}
          {userUpdateMessage && (
            <Alert variant='success'>{userUpdateMessage}</Alert>
          )}

          <Form onSubmit={handleProfileUpdate}>
            <Form.Group controlId='email'>
              <Form.Label>Email cím</Form.Label>
              <Form.Control
                type='email'
                placeholder={userInfo.email}
                value={updateEmail}
                onChange={(e) => setUpdateEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='username'>
              <Form.Label>Felhasználónév</Form.Label>
              <Form.Control
                type='username'
                placeholder={userInfo.username}
                value={updateUsername}
                onChange={(e) => setUpdateUsername(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Jelszó</Form.Label>
              <Form.Control
                type='password'
                value={updatePassword}
                onChange={(e) => setUpdatePassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Frissít
            </Button>
          </Form>
        </>
      )}
    </>
  );
};

export default UserInfoUpdateForm;
