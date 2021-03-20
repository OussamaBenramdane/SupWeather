import { GET_CITYS, CITY_ERROR, DELETE_CITY, ADD_CITY } from '../actions/types';
const initialState = {
  citys: [],
  city: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CITYS:
      return {
        ...state,
        citys: payload,
        loading: false
      };
    case ADD_CITY:
      return {
        ...state,
        citys: [...state.citys, payload],
        loading: false
      };
    case DELETE_CITY:
      return {
        ...state,
        citys: state.citys.filter(city => city._id !== payload),
        loading: false
      };
    case CITY_ERROR:
      return {
        ...state,
        err: payload,
        loading: false
      };
    default:
      return state;
  }
}
