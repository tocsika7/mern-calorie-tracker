import axios from 'axios';
import {
  FOOD_ADD_CLEAR,
  FOOD_ADD_FAIL,
  FOOD_ADD_REQUEST,
  FOOD_ADD_SUCCESS,
  FOOD_DETAILS_CLEAR,
  FOOD_DETAILS_REQUEST,
  FOOD_DETAILS_SUCCESS,
  FOOD_LIST_CLEAR,
  FOOD_LIST_FAIL,
  FOOD_LIST_REQUEST,
  FOOD_LIST_SUCCESS,
} from '../constants/foodConstants';
import { INTAKE_ADD_CLEAR } from '../constants/intakeConstants';

export const listFoods = (foodName) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FOOD_LIST_REQUEST,
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

    const { data } = await axios.get(`/api/foods/name/${foodName}`, config);

    dispatch({
      type: FOOD_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FOOD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearAfterAdd = () => (dispatch) => {
  dispatch({
    type: FOOD_LIST_CLEAR,
  });

  dispatch({
    type: INTAKE_ADD_CLEAR,
  });
};

export const addFoodToDB = (food) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FOOD_ADD_REQUEST,
    });

    const { userLogin } = getState();
    const { userAuth } = userLogin;

    if (!userAuth) {
      throw new Error('Unauthorized, no token.');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userAuth.token}`,
      },
    };

    await axios.post('/api/foods/', food, config);

    dispatch({
      type: FOOD_ADD_SUCCESS,
      payload: 'Sikeres hozzáadás',
    });
  } catch (error) {
    dispatch({
      type: FOOD_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearAFterDbAdd = () => (dispatch) => {
  dispatch({
    type: FOOD_ADD_CLEAR,
  });
};

export const getFoodDetails = (foodId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FOOD_DETAILS_REQUEST,
    });

    const { userLogin } = getState();
    const { userAuth } = userLogin;

    if (!userAuth) {
      throw new Error('Unauthorized, no token');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth.token}`,
      },
    };

    const { data } = await axios.get(`/api/foods/${foodId}`, config);

    dispatch({
      type: FOOD_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FOOD_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const foodDetailsClear = () => (dispatch) => {
  dispatch({
    type: FOOD_DETAILS_CLEAR,
  });
};
