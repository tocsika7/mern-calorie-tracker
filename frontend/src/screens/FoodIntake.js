import React, { useEffect } from 'react';
import { Row, Col, Alert, ListGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromIntake, listIntake } from '../actions/intakeActions';
import { useHistory } from 'react-router-dom';
import IntakeListItem from '../components/FoodIntake/IntakeListItem';
import { listReq } from '../actions/requirementActions';
import NutritionInfoProgressBar from '../components/FoodIntake/NutritionInfoProgressBar';

const FoodIntake = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const intakeList = useSelector((state) => state.intakeList);
  const intakeDelete = useSelector((state) => state.intakeDelete);
  const { userAuth } = userLogin;
  const { loading, error, dailyIntake } = intakeList;
  const { food } = dailyIntake;
  const { deleteSuccess } = intakeDelete;

  const handleClick = () => {
    history.push('/intake/add');
  };

  const handleDelete = (foodid) => {
    dispatch(deleteFromIntake(foodid));
  };

  useEffect(() => {
    if (!userAuth) {
      history.push('/login');
    } else {
      dispatch(listIntake());
      dispatch(listReq());
    }
  }, [dispatch, history, userAuth, deleteSuccess]);

  return (
    <>
      {loading ? (
        <Alert variant='primary'>Töltés...</Alert>
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <Row className='justify-content-center mt-3'>
          <Col md={6} xl={6}>
            <Button
              variant='primary'
              className='mb-2'
              onClick={handleClick}
              block={true}
            >
              Étel felvitele
            </Button>

            <ListGroup>
              {food.map((food) => (
                <ListGroup.Item key={food._id}>
                  <IntakeListItem food={food} handleDelete={handleDelete} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={3} xl={6}>
            <NutritionInfoProgressBar />
          </Col>
        </Row>
      )}
    </>
  );
};

export default FoodIntake;
