import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import WeightChangeLineChart from '../components/Statistics/WeightChangeLineChart';
import {
  getDailyNutritionSum,
  listWeight,
  getAvgMailNutrition,
} from '../actions/statisticsActions';
import DailySumBarCharts from '../components/Statistics/DailySumBarCharts';
import { MealAvgPieChart } from '../components/Statistics/MealAvgPieChart';

const Statistics = () => {
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userAuth } = userLogin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userAuth) {
      history.push('/login');
    } else {
      dispatch(listWeight());
      dispatch(getDailyNutritionSum());
      dispatch(getAvgMailNutrition());
    }
  }, [history, userAuth, dispatch]);

  return (
    <Container className='justify-content-md-center'>
      <Row xl={3} md={2} xs={1}>
        <WeightChangeLineChart />
        <DailySumBarCharts />
        <MealAvgPieChart />
      </Row>
    </Container>
  );
};

export default Statistics;
