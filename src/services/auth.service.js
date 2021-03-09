import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        brojIndexa: user.brojIndexa,
        lozinka: user.lozinka
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

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
