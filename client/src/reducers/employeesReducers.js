import {
  EMPLOYEES_ADD_FAIL,
  EMPLOYEES_ADD_REQUEST,
  EMPLOYEES_ADD_SUCCESS,
  EMPLOYEES_GET_FAIL,
  EMPLOYEES_GET_REQUEST,
  EMPLOYEES_GET_SUCCESS,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAIL,
  FIND_EMPLOYEE_SUCCESS,
} from '../constants/employeesConstant';

export const addEmployeesReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEES_ADD_REQUEST:
      return { loading: true };
    case EMPLOYEES_ADD_SUCCESS:
      return { loading: false, employeesInfo: action.payload };
    case EMPLOYEES_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const getEmployeesReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEES_GET_REQUEST:
      return { ...state, loading: true };
    case EMPLOYEES_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        employeesInfo: action.payload.employeesInfo,
      };
    case FIND_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        editEmployee: state.employeesInfo.find(
          (item) => item._id === action.payload
        ),
      };
    case EMPLOYEES_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateEmployeesReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EMPLOYEE_REQUEST:
      return { ...state, loading: true };
    case UPDATE_EMPLOYEE_SUCCESS:
      return { ...state, loading: false, employeesInfo: action.payload };
    case UPDATE_EMPLOYEE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteEmployeesReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EMPLOYEE_REQUEST:
      return { ...state, loading: true };
    case DELETE_EMPLOYEE_SUCCESS:
      return { ...state, loading: false, employeesInfo: action.payload };
    case DELETE_EMPLOYEE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
