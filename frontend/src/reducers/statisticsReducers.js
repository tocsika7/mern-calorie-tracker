import {
  DAILY_SUM_FAIL,
  DAILY_SUM_REQUEST,
  DAILY_SUM_SUCCESS,
  WEIGHT_LIST_FAIL,
  WEIGHT_LIST_REQUEST,
  WEIGHT_LIST_SUCCESS,
  MEAL_AVG_FAIL,
  MEAL_AVG_SUCCESS,
  MEAL_AVG_REQUEST,
} from '../constants/statisticsConstants';

export const weightListReducer = (
  state = {
    weightList: [],
  },
  action
) => {
  switch (action.type) {
    case WEIGHT_LIST_REQUEST:
      return { ...state, loading: true };
    case WEIGHT_LIST_SUCCESS:
      return { loading: false, weightList: action.payload };
    case WEIGHT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const dailyNutritionSumReducer = (state = { dailySum: [] }, action) => {
  switch (action.type) {
    case DAILY_SUM_REQUEST:
      return { ...state, loading: true };
    case DAILY_SUM_SUCCESS:
      return { loading: false, dailySum: action.payload };
    case DAILY_SUM_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const avgMealNutritionReducer = (
  state = {
    avgNutData: {
      avgCalories: 0,
      avgProtien: 0,
      avgCarbs: 0,
      avgFat: 0,
    },
  },
  action
) => {
  switch (action.type) {
    case MEAL_AVG_REQUEST:
      return { ...state, loading: true };
    case MEAL_AVG_SUCCESS:
      return { loading: false, avgNutData: action.payload };
    case MEAL_AVG_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
