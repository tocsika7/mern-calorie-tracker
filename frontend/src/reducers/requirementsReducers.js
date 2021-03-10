import {
  REQUIREMENTS_LIST_REQUEST,
  REQUIREMENTS_LIST_SUCCESS,
  REQUIREMENTS_LIST_FAIL,
  REQUIREMENTS_UPDATE_REQUEST,
  REQUIREMENTS_UPDATE_FAIL,
  REQUIREMENTS_UPDATE_SUCCESS,
  REQUIREMENT_UPDATE_RESET,
} from '../constants/requirementConstants';
export const requirementsListReducer = (
  state = {
    dailyReq: {
      intake: {
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
    case REQUIREMENTS_LIST_REQUEST:
      return { ...state, loading: true };
    case REQUIREMENTS_LIST_SUCCESS:
      return { loading: false, dailyReq: action.payload };
    case REQUIREMENTS_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateRequirementsReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUIREMENTS_UPDATE_REQUEST:
      return { loading: true };
    case REQUIREMENTS_UPDATE_SUCCESS:
      return { loading: false, message: action.payload };
    case REQUIREMENTS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case REQUIREMENT_UPDATE_RESET:
      return { reset: true };
    default:
      return state;
  }
};
