import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

class TerminiService {
  getTermini(id) {
    /* eslint-disable no-console */
    console.log(id);
    /* eslint-enable no-console */
    return axios.get(API_URL + 'findtermini/' + id, { headers: authHeader() });
  }
}

export default new TerminiService();