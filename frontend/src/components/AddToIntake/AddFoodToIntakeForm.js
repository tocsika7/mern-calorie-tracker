import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal,
  Button,
  InputGroup,
  Form,
  ListGroup,
  Alert,
} from 'react-bootstrap';
import { clearAfterAdd, foodDetailsClear } from '../../actions/foodActions';
import { addToIntake } from '../../actions/intakeActions';

const AddFoodToIntakeForm = () => {
  const foodDetails = useSelector((state) => state.foodDetails);
  const { loading, error, food, show } = foodDetails;
  const intakeAdd = useSelector((state) => state.intakeAdd);
  const { message, error: intakeAddError } = intakeAdd;
  const [gramms, setGramms] = useState(100);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(foodDetailsClear());
    setGramms(100);
  };

  const handleConfirm = () => {
    const foodToAdd = {
      name: food.name,
      calories: food.calories,
      protien: food.protein,
      ch: food.ch,
      fat: food.fat,
      protein: food.protein,
    };

    dispatch(addToIntake(gramms, foodToAdd));

    setTimeout(() => {
      dispatch(foodDetailsClear());
      dispatch(clearAfterAdd());
    }, 2000);
  };

  return loading ? (
    <Alert variant='primary'>Loading...</Alert>
  ) : error ? (
    <Alert variant='danger'>{error}</Alert>
  ) : (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Hozzáadás: {food.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <Alert variant='success'>{message}</Alert>}
        {intakeAddError && <Alert variant='danger'>{intakeAddError}</Alert>}
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id='basic-addon1'>Gramm</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type='number'
            value={gramms}
            onChange={(e) => setGramms(e.target.value)}
          ></Form.Control>
        </InputGroup>
        <ListGroup>
          <ListGroup.Item>
            Kalória: {(food.calories * gramms) / 100} g
          </ListGroup.Item>
          <ListGroup.Item>
            Fehérje: {(food.protein * gramms) / 100} g
          </ListGroup.Item>
          <ListGroup.Item>
            Szénhidrát: {(food.ch * gramms) / 100} g
          </ListGroup.Item>
          <ListGroup.Item>Fat {(food.fat * gramms) / 100} g</ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Mégse
        </Button>
        <Button variant='primary' onClick={handleConfirm}>
          Mentés
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddFoodToIntakeForm;
