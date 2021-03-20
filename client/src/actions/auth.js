import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthToken';
//Load User

export const loadUser = () => async dispatch => {
  //check local storge
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//Register User

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ name, email, password }); // Rendring the Json data as a string

  try {
    const res = await axios.post('/api/users', body, config); // Send the data to the server trouht the mentioned route
    dispatch({ type: REGISTER_SUCCESS, payload: res.data }); // Firing Up sccess alert /  getting data from the server
    dispatch(loadUser()); //load data recieved from the server
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      //Error handling block
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL //Firing Error Alert
    });
  }
};

//Login User
export const login = (email, password) => async dispatch => {
  //Login called by on submit action
  const config = {
    headers: {
      'Content-Type': 'application/json' //Type of body data Like in post man
    }
  };
  const body = JSON.stringify({ email, password }); // Rendring the Json data as a string

  try {
    const res = await axios.post('/api/auth', body, config); // Send the data to the server trouht the mentioned route

    dispatch({ type: LOGIN_SUCCESS, payload: res.data }); // Firing Up sccess alert /  getting data from the server
    dispatch(loadUser()); //load data recieved from the server
  } catch (err) {
    //Error handling block
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL //Firing Error Alert
    });
  }
};

//Logout /ClearProfile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
