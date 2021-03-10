import axios from 'axios';
import {
  DAILY_SUM_FAIL,
  DAILY_SUM_REQUEST,
  DAILY_SUM_SUCCESS,
  MEAL_AVG_FAIL,
  MEAL_AVG_REQUEST,
  MEAL_AVG_SUCCESS,
  WEIGHT_LIST_FAIL,
  WEIGHT_LIST_REQUEST,
  WEIGHT_LIST_SUCCESS,
} from '../constants/statisticsConstants';

export const listWeight = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: WEIGHT_LIST_REQUEST,
    });

    const { userLogin } = getState();
    const { userAuth } = userLogin;

    if (!userAuth) {
      throw new Error('Unauthorized, no token.');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth.token}`,
      },
    };

    const { data } = await axios.get('/api/users/weight', config);

    dispatch({
      type: WEIGHT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WEIGHT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDailyNutritionSum = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAILY_SUM_REQUEST,
    });
    const { userLogin } = getState();
    const { userAuth } = userLogin;

    if (!userAuth) {
      throw new Error('Unauthorized, no token.');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth.token}`,
      },
    };

    const { data } = await axios.get('/api/intake/sum', config);

    dispatch({
      type: DAILY_SUM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DAILY_SUM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAvgMailNutrition = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEAL_AVG_REQUEST,
    });

    const { userLogin } = getState();
    const { userAuth } = userLogin;

    if (!userAuth) {
      throw new Error('Unauthorized, no token.');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth.token}`,
      },
    };

    const { data } = await axios.get('/api/intake/avg', config);

    dispatch({
      type: MEAL_AVG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEAL_AVG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
