import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userSignUpReducer } from './reducers/userReducers';
import {
  addEmployeesReducer,
  deleteEmployeesReducer,
  getEmployeesReducer,
  updateEmployeesReducer,
} from './reducers/employeesReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userSignup: userSignUpReducer,
  employees: addEmployeesReducer,
  getEmployees: getEmployeesReducer,
  deleteEmployee: deleteEmployeesReducer,
  updateEmployee: updateEmployeesReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
