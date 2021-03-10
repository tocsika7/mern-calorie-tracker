import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

const IntakeListItem = ({ food, handleDelete }) => {
  return (
    <Card>
      <Card.Header>
        <h4>
          {food.name} {food.gramms} g
        </h4>
      </Card.Header>
      <Card.Body>
        <div>
          <Badge className='mr-1' variant='info'>
            Kalória: {food.calories} kcal
          </Badge>
          <Badge className='mr-1' variant='primary'>
            Fehérje: {food.protein} g
          </Badge>
          <Badge className='mr-1' variant='success'>
            Szénhidrát: {food.ch} g
          </Badge>
          <Badge variant='warning'>Zsír: {food.fat} g</Badge>
        </div>
        <Button
          className='mt-3 p-1'
          variant='danger'
          onClick={() => handleDelete(food._id)}
        >
          Törlés
        </Button>
      </Card.Body>
    </Card>
  );
};

export default IntakeListItem;
