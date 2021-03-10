import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import UserInfoList from '../components/Profile/UserInfoList';
import UserInfoUpdateForm from '../components/Profile/UserInfoUpdateForm';
import NutritionInfoList from '../components/Profile/NutritionInfoList';
import { NutritionUpdateForm } from '../components/Profile/NutritionUpdateForm';

export const Profile = () => {
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userAuth } = userLogin;

  useEffect(() => {
    if (!userAuth) {
      history.push('/login');
    }
  }, [history, userAuth]);

  return (
    <Container>
      <Row>
        <Col xs={3} md={6}>
          <UserInfoList />
          <NutritionInfoList />
        </Col>
        <Col xs={3} md={6}>
          <NutritionUpdateForm />
        </Col>
      </Row>
      <Row>
        <Col xs={3} md={6}>
          <UserInfoUpdateForm />
        </Col>
      </Row>
    </Container>
  );
};
