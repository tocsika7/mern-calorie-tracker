import React, { useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import FormContainer from '../FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { addFoodToDB, clearAFterDbAdd } from '../../actions/foodActions';

export const AddFoodToDatabaseForm = () => {
  const foodAdd = useSelector((state) => state.foodAdd);
  const { loading, error, message } = foodAdd;

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('');
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [ch, setCh] = useState(0);
  const [fat, setFat] = useState(0);
  const gramms = 100;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addFoodToDB({ name, gramms, calories, protein, ch, fat }));

    setTimeout(() => {
      dispatch(clearAFterDbAdd());
      handleClose();
      setCalories(0);
      setName('');
      setCh(0);
      setProtein(0);
      setFat(0);
    }, 3000);
  };

  return (
    <>
      <div className='mt-2'>
        <h4>Nem találja a keresett ételt?</h4>
        <Button onClick={handleShow}>Új étel felvitele az adatbázisba</Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Étel hozzáadása az adatbázishoz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <Alert variant='primary'>Töltés..</Alert>}
          {error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}
          <FormContainer>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='foodGramms'>
                <Form.Label>Gramm</Form.Label>
                <Form.Control
                  type='number'
                  disabled
                  required
                  placeholder='100'
                  value={100}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='foodName'>
                <Form.Label>Étel neve</Form.Label>
                <Form.Control
                  type='text'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='foodCalories'>
                <Form.Label>Kalória</Form.Label>
                <Form.Control
                  type='number'
                  required
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='foodProtein'>
                <Form.Label>Fehérje</Form.Label>
                <Form.Control
                  type='number'
                  required
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='foodCarbs'>
                <Form.Label>Szénhidrát</Form.Label>
                <Form.Control
                  type='number'
                  required
                  value={ch}
                  onChange={(e) => setCh(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='foodFat'>
                <Form.Label>Zsír</Form.Label>
                <Form.Control
                  type='number'
                  required
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form>
          </FormContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={handleClose}>
            Mégse
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            Mentés
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
