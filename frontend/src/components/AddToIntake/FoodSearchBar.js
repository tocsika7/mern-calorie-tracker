import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { listFoods } from '../../actions/foodActions';

export const FoodSearchBar = () => {
  const [foodName, setFoodName] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(listFoods(foodName));
  };

  return (
    <Form className='w-100' onSubmit={handleSubmit}>
      <Form.Group controlId='foodName'>
        <Form.Control
          type='text'
          placeholder='Étel keresése...'
          required
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        ></Form.Control>
        <Button type='submit'>Keresés</Button>
      </Form.Group>
    </Form>
  );
};
