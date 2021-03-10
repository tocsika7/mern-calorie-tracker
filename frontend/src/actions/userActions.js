import axios from 'axios';
import {
  USER_INFO_FAIL,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants';

export const loginUser = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { username, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userAuth', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('userAuth');
  dispatch({
    type: USER_LOGOUT,
  });
};

export const registerUser = (username, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.post(
      '/api/users/register',
      { username, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: 'Sikeres regisztráció',
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserInfo = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_INFO_REQUEST,
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

    const { data } = await axios.get('/api/users/profile', config);

    dispatch({
      type: USER_INFO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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

    const { data } = await axios.put('/api/users/profile', user, config);

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearAfterUserUpdate = () => (dispatch) => {
  dispatch({
    type: USER_UPDATE_RESET,
  });
};
