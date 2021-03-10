import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, ListGroup } from 'react-bootstrap';
import { getUserInfo } from '../../actions/userActions';

const UserInfoList = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, userInfo } = userProfile;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { reset } = userUpdate;

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch, reset]);

  return (
    <>
      {loading ? (
        <Alert variant='primary'>Töltés...</Alert>
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <ListGroup>
          <h3>Felhasználói Adatok</h3>
          <ListGroup.Item>Email: {userInfo.email}</ListGroup.Item>
          <ListGroup.Item>Felhasználónév: {userInfo.username}</ListGroup.Item>
        </ListGroup>
      )}
    </>
  );
};

export default UserInfoList;
