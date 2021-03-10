import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userAuth } = userLogin;
  const history = useHistory();

  useEffect(() => {
    if (userAuth) {
      history.push('/');
    }
  }, [userAuth, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
  };

  return (
    <FormContainer>
      <h1>Bejelentkezés</h1>
      {loading && <Alert variant='primary'>Töltés..</Alert>}
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='username'>
          <Form.Label>Felhasználónév</Form.Label>
          <Form.Control
            type='username'
            placeholder='Felhasználónév megadása'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Jelszó</Form.Label>
          <Form.Control
            type='password'
            placeholder='Jelszó megadása'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Belépés
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Még nem regisztrált? <Link to='/register'>Regisztráció</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
