import axios from 'axios';

const API_URL = 'https://aai.sum.ba/korisnik/api/iss/login';
const headers = {
  'Accept': 'application/json'
}

class AuthService {
  login(user) {
    return axios
      .post(API_URL, {
        headers: headers,
        username: user.email,
        password: user.lozinka
      })
      .then(response => {
        
          localStorage.setItem('user', JSON.stringify(response.data));
        

        return response.data;
      })
      .then((response) => {
        return axios
          .post('http://localhost:8080/signup', {
            brojIndexa: response.user.sumEduPersonUniqueID,
            username: response.user.uid,
            ime: response.user.givenname,
            prezime: response.user.sn,
            email: response.user.mail,
            lozinka: response.user.userpassword,
            datumKreiranja: new Date(),
            ulogaFK: response.user.sumEduPersonAffiliation,
            ustanovaFK: response.user.sumEduPersonHomeOrg.split('.')[0]
      })
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  /* register(user) {
    return axios.post(API_URL + 'signup', {
      brojIndexa: user.brojIndexa,
      ime: user.ime,
      prezime: user.prezime,
      email: user.email,
      lozinka: user.lozinka
    });
  } */
}

export default new AuthService();
