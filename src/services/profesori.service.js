import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';


  export const GetProfessors = {
    getProfessor: function() {
      return axios.get(API_URL + 'findprofessors', { headers: authHeader() });
    }
  };