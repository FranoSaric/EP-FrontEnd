import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';


  export const GetStudents = {
    getStudent: function(id) {
      return axios.get(API_URL + 'findkorisnik/' + id, { headers: authHeader() });
    }
  };