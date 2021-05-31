import axios from 'axios';

import {
  EMPLOYEES_ADD_FAIL,
  EMPLOYEES_ADD_REQUEST,
  EMPLOYEES_ADD_SUCCESS,
  EMPLOYEES_GET_REQUEST,
  EMPLOYEES_GET_SUCCESS,
  EMPLOYEES_GET_FAIL,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAIL,
  FIND_EMPLOYEE_SUCCESS,
} from '../constants/employeesConstant';

export const request = axios.create({
  baseURL: 'https://enigmatic-springs-70849.herokuapp.com',
  headers: {
    'Content-type': 'application/json',
  },
});
const requestConfig = (request) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  request.headers.common['x-auth-token'] = `${userInfo && userInfo.token}`;
  return request;
};
request.interceptors.request.use(requestConfig);

export const addEmployees =
  (name, email, phone, species) => async (dispatch) => {
    try {
      dispatch({
        type: EMPLOYEES_ADD_REQUEST,
      });

      const { data } = await request.post('/api/employeesInfo', {
        name,
        email,
        phone,
        species,
      });

      dispatch({
        type: EMPLOYEES_ADD_SUCCESS,
        payload: data,
      });
      dispatch(getEmployeesInfo());
    } catch (error) {
      dispatch({
        type: EMPLOYEES_ADD_FAIL,
        payload: error,
      });
    }
  };

export const updateEmployeesInfo =
  (id, name, email, phone, species) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_EMPLOYEE_REQUEST,
      });

      const { data } = await request.put(`/api/employeesInfo/${id}`, {
        name,
        email,
        phone,
        species,
      });

      dispatch({
        type: UPDATE_EMPLOYEE_SUCCESS,
        payload: data,
      });
      dispatch(getEmployeesInfo());
    } catch (error) {
      dispatch({
        type: UPDATE_EMPLOYEE_FAIL,
        payload: error,
      });
    }
  };

export const getEmployeesInfo = () => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEES_GET_REQUEST,
    });

    const { data } = await request.get('/api/employeesInfo');
    dispatch({
      type: EMPLOYEES_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEES_GET_FAIL,
      payload: error,
    });
  }
};

export const deleteEmployeesInfo = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_EMPLOYEE_REQUEST,
    });
    const { data } = await request.delete(`/api/employeesInfo/${id}`);

    dispatch({
      type: DELETE_EMPLOYEE_SUCCESS,
      payload: data,
    });
    dispatch(getEmployeesInfo());
  } catch (error) {
    dispatch({
      type: DELETE_EMPLOYEE_FAIL,
      payload: error,
    });
  }
};

export const findEmployeesById = (id) => {
  return {
    type: FIND_EMPLOYEE_SUCCESS,
    payload: id,
  };
};
