import axios from 'axios';
import {
  INTAKE_ADD_FAIL,
  INTAKE_ADD_REQUEST,
  INTAKE_ADD_SUCCESS,
  INTAKE_DELETE_FAIL,
  INTAKE_DELETE_REQUEST,
  INTAKE_DELETE_SUCCESS,
  INTAKE_LIST_FAIL,
  INTAKE_LIST_REQUEST,
  INTAKE_LIST_SUCCESS,
} from '../constants/intakeConstants';

export const listIntake = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: INTAKE_LIST_REQUEST,
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

    const { data } = await axios.get('/api/intake', config);

    dispatch({
      type: INTAKE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INTAKE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addToIntake = (gramms, food) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INTAKE_ADD_REQUEST,
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

    await axios.post('/api/intake', { gramms, food }, config);

    dispatch({
      type: INTAKE_ADD_SUCCESS,
      payload: 'Sikeres hozzáadás',
    });
  } catch (error) {
    dispatch({
      type: INTAKE_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteFromIntake = (foodid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INTAKE_DELETE_REQUEST,
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

    await axios.delete(`/api/intake/${foodid}`, config);

    dispatch({
      type: INTAKE_DELETE_SUCCESS,
      payload: 'deleted',
    });
  } catch (error) {
    dispatch({
      type: INTAKE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
