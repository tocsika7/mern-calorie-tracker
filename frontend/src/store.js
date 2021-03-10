import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userInfoReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import {
  intakeAddReducer,
  intakeDeleteReducer,
  intakeListReducer,
} from './reducers/intakeReducers';
import {
  requirementsListReducer,
  updateRequirementsReducer,
} from './reducers/requirementsReducers';
import {
  foodAddReducer,
  foodDetailsReducer,
  foodListReducer,
} from './reducers/foodReducers';
import {
  avgMealNutritionReducer,
  dailyNutritionSumReducer,
  weightListReducer,
} from './reducers/statisticsReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  intakeList: intakeListReducer,
  intakeAdd: intakeAddReducer,
  intakeDelete: intakeDeleteReducer,
  reqList: requirementsListReducer,
  userProfile: userInfoReducer,
  userUpdate: userUpdateReducer,
  reqUpdate: updateRequirementsReducer,
  foodList: foodListReducer,
  foodAdd: foodAddReducer,
  foodDetails: foodDetailsReducer,
  weightList: weightListReducer,
  dailyNutritionSum: dailyNutritionSumReducer,
  avgMealNutrition: avgMealNutritionReducer,
});

const userAuthFromStorage = localStorage.getItem('userAuth')
  ? JSON.parse(localStorage.getItem('userAuth'))
  : null;

const initialState = {
  userLogin: { userAuth: userAuthFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
