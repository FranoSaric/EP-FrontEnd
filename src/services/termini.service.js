import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';


  export const GetTermins = {
    getTermini: function(id) {
      return axios.get(API_URL + 'findtermini/' + id, { headers: authHeader() });
    }
  };