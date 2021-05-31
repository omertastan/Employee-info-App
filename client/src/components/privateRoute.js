import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import React from 'react';

import { USER_LOGIN_SUCCESS } from '../constants/userConstants';

export const getLocalStorage = (id) => {
  if (typeof window !== undefined) {
    return JSON.parse(localStorage.getItem(id));
  }
};

export const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userLogin);

  const { push } = useHistory();
  const userData = getLocalStorage('userInfo');

  const { token } = userData || {};

  useEffect(() => {
    if (userData) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: userData });
    } else {
      push('/login');
    }
    // eslint-disable-next-line
  }, [dispatch, isAuthenticated]);

  return isAuthenticated ? children : <div>Loading...</div>;
};
