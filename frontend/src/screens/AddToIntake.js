import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Alert, ListGroup, Container } from 'react-bootstrap';
import { getFoodDetails } from '../actions/foodActions';
import { AddFoodToDatabaseForm } from '../components/AddToIntake/AddFodToDatabaseForm';
import { FoodSearchBar } from '../components/AddToIntake/FoodSearchBar';
import AddFoodToIntakeForm from '../components/AddToIntake/AddFoodToIntakeForm';

export const AddToIntake = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userAuth } = userLogin;

  const foodList = useSelector((state) => state.foodList);
  const { loading, error, foods } = foodList;

  useEffect(() => {
    if (!userAuth) {
      history.push('/login');
    }
  }, [history, userAuth]);

  const handleClick = (foodId) => {
    dispatch(getFoodDetails(foodId));
  };

  return (
    <Container className='mt-3'>
      <Row className=''>
        <Col>
          <AddFoodToIntakeForm />
          <FoodSearchBar />
          {loading ? (
            <Alert variant='primary'>Töltés..</Alert>
          ) : error ? (
            <Alert variant='danger'>{error}</Alert>
          ) : (
            <ListGroup>
              {foods.map((food) => (
                <ListGroup.Item
                  variant='flush'
                  key={food._id}
                  onClick={() => handleClick(food._id)}
                >
                  <h4>
                    {food.name} {food.calories} kcal
                  </h4>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
      <Row>
        <AddFoodToDatabaseForm />
      </Row>
    </Container>
  );
};
