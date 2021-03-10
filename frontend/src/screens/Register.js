import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/userActions';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const userRegister = useSelector((state) => state.userRegister);
  const { userAuth } = userLogin;
  const { loading, error, message } = userRegister;
  const history = useHistory();

  useEffect(() => {
    if (userAuth) {
      history.push('/');
    }
  }, [history, userAuth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(username, email, password));
  };

  return (
    <FormContainer>
      <h1>Regisztráció</h1>
      {loading && <Alert variant='primary'>Töltés..</Alert>}
      {error && <Alert variant='danger'>{error}</Alert>}
      {message && <Alert variant='success'>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='email'>
          <Form.Label>Email cím</Form.Label>
          <Form.Control
            type='email'
            placeholder='Email cím megadása'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

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
          Regisztráció
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Már van fiókja? <Link to='/login'>Belépés</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
