import axios from 'axios';
import { setAlert } from './alert';
import { GET_CITYS, CITY_ERROR, DELETE_CITY, ADD_CITY } from './types';

//Get Citys

export const getCitys = () => async dispatch => {
  try {
    const res = await axios.get('/api/city');
    dispatch({
      type: GET_CITYS,
      payload: res.data.weather_data
    });
  } catch (err) {
    dispatch({
      type: CITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete City

export const deleteCity = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/city/${id}`);

    dispatch({
      type: DELETE_CITY,
      payload: id
    });
    dispatch(setAlert('City Removed', 'success'));
  } catch (err) {
    dispatch({
      type: CITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
//Add City

export const addCity = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/city', formData, config);

    dispatch({
      type: ADD_CITY,
      payload: res.data
    });
    dispatch(setAlert('City Created', 'success'));
  } catch (err) {
    dispatch({
      type: CITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
