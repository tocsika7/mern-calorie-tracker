import {
  FOOD_LIST_REQUEST,
  FOOD_LIST_SUCCESS,
  FOOD_LIST_FAIL,
  FOOD_LIST_CLEAR,
  FOOD_ADD_REQUEST,
  FOOD_ADD_SUCCESS,
  FOOD_ADD_FAIL,
  FOOD_ADD_CLEAR,
  FOOD_DETAILS_REQUEST,
  FOOD_DETAILS_SUCCESS,
  FOOD_DETAILS_FAIL,
  FOOD_DETAILS_CLEAR,
} from '../constants/foodConstants';

export const foodListReducer = (state = { foods: [] }, action) => {
  switch (action.type) {
    case FOOD_LIST_REQUEST:
      return { ...state, loading: true };
    case FOOD_LIST_SUCCESS:
      return { loading: false, foods: action.payload };
    case FOOD_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case FOOD_LIST_CLEAR:
      return { foods: [] };
    default:
      return state;
  }
};

export const foodAddReducer = (state = {}, action) => {
  switch (action.type) {
    case FOOD_ADD_REQUEST:
      return { loading: true };
    case FOOD_ADD_SUCCESS:
      return { loading: false, message: action.payload };
    case FOOD_ADD_FAIL:
      return { loading: false, error: action.payload };
    case FOOD_ADD_CLEAR:
      return {};
    default:
      return state;
  }
};

export const foodDetailsReducer = (
  state = {
    food: {
      _id: '',
      name: '',
      gramms: 0,
      calories: 0,
      protein: 0,
      ch: 0,
      fat: 0,
    },
    show: false,
  },
  action
) => {
  switch (action.type) {
    case FOOD_DETAILS_REQUEST:
      return { ...state, loading: true };
    case FOOD_DETAILS_SUCCESS:
      return { loading: false, food: action.payload, show: true };
    case FOOD_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case FOOD_DETAILS_CLEAR:
      return {
        loading: false,
        food: {
          _id: '',
          name: '',
          gramms: 0,
          calories: 0,
          protein: 0,
          ch: 0,
          fat: 0,
        },
        show: false,
      };
    default:
      return state;
  }
};
