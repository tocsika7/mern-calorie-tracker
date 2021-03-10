import axios from 'axios';
import {
  REQUIREMENTS_LIST_FAIL,
  REQUIREMENTS_LIST_REQUEST,
  REQUIREMENTS_LIST_SUCCESS,
  REQUIREMENTS_UPDATE_FAIL,
  REQUIREMENTS_UPDATE_REQUEST,
  REQUIREMENTS_UPDATE_SUCCESS,
  REQUIREMENT_UPDATE_RESET,
} from '../constants/requirementConstants';

export const listReq = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUIREMENTS_LIST_REQUEST,
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

    const { data } = await axios.get('/api/requirements', config);

    dispatch({
      type: REQUIREMENTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REQUIREMENTS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateReq = (weight, height) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUIREMENTS_UPDATE_REQUEST,
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

    await axios.put('/api/requirements', { weight, height }, config);

    dispatch({
      type: REQUIREMENTS_UPDATE_SUCCESS,
      payload: 'Sikeres frissítés',
    });
  } catch (error) {
    dispatch({
      type: REQUIREMENTS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const reqUpdateClear = () => (dispatch) => {
  dispatch({
    type: REQUIREMENT_UPDATE_RESET,
  });
};
