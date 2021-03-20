import axios from 'axios';

//Check Token Existes and add it to the headers else delete the token
//axios to add to the headers

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
export default setAuthToken;
