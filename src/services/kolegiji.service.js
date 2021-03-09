import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

class KolegijiService {
  getKolegiji(id) {
    return axios.get(API_URL + 'findkolegiji/' + id, { headers: authHeader() });
  }
}

export default new KolegijiService();