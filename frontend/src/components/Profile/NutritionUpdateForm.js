import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { reqUpdateClear, updateReq } from '../../actions/requirementActions';

export const NutritionUpdateForm = () => {
  const reqUpdate = useSelector((state) => state.reqUpdate);
  const { loading, error, message } = reqUpdate;

  const dispatch = useDispatch();

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateReq(weight, height));

    setTimeout(() => {
      dispatch(reqUpdateClear());
    }, 2000);
  };

  return (
    <>
      <h3>Napi szükséglet újraszámítása</h3>
      <Form onSubmit={handleSubmit}>
        {loading && <Alert variant='primary'>Töltés...</Alert>}
        {error && <Alert variant='danger'>{error}</Alert>}
        {message && <Alert variant='success'>{message}</Alert>}
        <Form.Group controlId='weight'>
          <Form.Label>Súly</Form.Label>
          <Form.Control
            required
            type='number'
            placeholder='Súly megadása (kg)'
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='age'>
          <Form.Label>Magasság</Form.Label>
          <Form.Control
            required
            type='number'
            placeholder='Magasság megadása'
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Frissítés
        </Button>
      </Form>
    </>
  );
};
