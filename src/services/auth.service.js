import axios from 'axios';

const API_URL = 'https://aai.sum.ba/korisnik/api/iss/login';
const headers = {
  'Accept': 'application/json'
}

class AuthService {
  login() {
    return axios
      .post(API_URL, {
        headers: headers,
        username: "Fsaric@sum.ba",
        password: "Sarke.007"
      })
      .then(response => {
        
          localStorage.setItem('user', JSON.stringify(response.data));
        

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      brojIndexa: user.brojIndexa,
      ime: user.ime,
      prezime: user.prezime,
      email: user.email,
      lozinka: user.lozinka
    });
  }
}

export default new AuthService();
