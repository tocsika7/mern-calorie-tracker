import {
  INTAKE_LIST_REQUEST,
  INTAKE_LIST_SUCCESS,
  INTAKE_LIST_FAIL,
  INTAKE_ADD_SUCCESS,
  INTAKE_ADD_FAIL,
  INTAKE_ADD_REQUEST,
  INTAKE_ADD_CLEAR,
  INTAKE_DELETE_REQUEST,
  INTAKE_DELETE_SUCCESS,
  INTAKE_DELETE_FAIL,
} from '../constants/intakeConstants';

export const intakeListReducer = (
  state = {
    dailyIntake: {
      food: [],
      sum: {
        calories: 0,
        protein: 0,
        fat: 0,
        ch: 0,
      },
    },
  },
  action
) => {
  switch (action.type) {
    case INTAKE_LIST_REQUEST:
      return { ...state, loading: true };
    case INTAKE_LIST_SUCCESS:
      return { loading: false, dailyIntake: action.payload };
    case INTAKE_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const intakeAddReducer = (state = {}, action) => {
  switch (action.type) {
    case INTAKE_ADD_REQUEST:
      return { loading: true };
    case INTAKE_ADD_SUCCESS:
      return { loading: false, message: action.payload };
    case INTAKE_ADD_FAIL:
      return { loading: false, error: action.payload };
    case INTAKE_ADD_CLEAR:
      return {};
    default:
      return state;
  }
};

export const intakeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case INTAKE_DELETE_REQUEST:
      return { loading: true };
    case INTAKE_DELETE_SUCCESS:
      return { loading: false, deleteSuccess: action.payload };
    case INTAKE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
