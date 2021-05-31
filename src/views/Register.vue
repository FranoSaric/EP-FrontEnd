<template>
  <section class="Form my-4 mx-5">
        <div class="container">
            <div class="row no-gutters">
                <div class="col-lg-5">
                    <img src="../assets/artboard_1.jpg" class="img-fluid" alt="">
                </div>
                <div class="col-lg-7 px-5 pt-5">
                    <img src="../assets/Artboard_2.png" class="img-fluid rounded mx-auto d-block" alt="">
                    <h1 class="font-weight-bold py-3 text-center">Sve evidencije na jednom mjestu</h1>
                    <h4>Registrirajte profesora</h4>
                    <form name="form" @submit.prevent="handleRegister">
                        <div v-if="!successful">
                            <div class="form-row">
                                <div class="col-lg-12">
                                    <input
                                        v-model="user.brojIndexa"
                                        v-validate="'required|min:3|max:20'"
                                        type="text"
                                        class="form-control my-3 p-4"
                                        name="brojIndexa"
                                        placeholder="Broj indexa"
                                    />
                                    <div
                                        v-if="submitted && errors.has('brojIndexa')"
                                        class="alert-danger"
                                        >{{errors.first('brojIndexa')}}
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-lg-12">
                                    <input
                                        v-model="user.ime"
                                        v-validate="'required|min:3|max:20'"
                                        type="text"
                                        class="form-control my-3 p-4"
                                        name="ime"
                                        placeholder="Korisničko ime"
                                    />
                                    <div
                                        v-if="submitted && errors.has('ime')"
                                        class="alert-danger"
                                        >{{errors.first('ime')}}
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-lg-12">
                                    <input
                                        v-model="user.prezime"
                                        v-validate="'required|min:3|max:20'"
                                        type="text"
                                        class="form-control my-3 p-4"
                                        name="prezime"
                                        placeholder="Korisničko prezime"
                                    />
                                    <div
                                        v-if="submitted && errors.has('prezime')"
                                        class="alert-danger"
                                        >{{errors.first('prezime')}}
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-lg-12">
                                    <input
                                        v-model="user.email"
                                        v-validate="'required|email|max:50'"
                                        type="email"
                                        class="form-control my-3 p-4"
                                        name="email"
                                        placeholder="E-mail"
                                    />
                                    <div
                                        v-if="submitted && errors.has('email')"
                                        class="alert-danger"
                                        >{{errors.first('email')}}
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-lg-12">
                                    <input
                                        v-model="user.lozinka"
                                        v-validate="'required|min:6|max:40'"
                                        type="password"
                                        class="form-control my-3 p-4"
                                        name="lozinka"
                                        placeholder="Lozinka"
                                    />
                                    <div
                                        v-if="submitted && errors.has('lozinka')"
                                        class="alert-danger"
                                        >{{errors.first('lozinka')}}
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-lg-12">
                                    <select name="roles" class="form-select">
                                      <option value="[3]">Student</option>
                                      <option value="[4]">Asistent</option>
                                    </select>
                                    <div
                                        v-if="submitted && errors.has('roles')"
                                        class="alert-danger"
                                        >{{errors.first('roles')}}
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-lg-12">
                                    <button class="btn1 mt-3 mb-3">Registrirajte korisnika</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div
                        v-if="message"
                        class="alert"
                        :class="successful ? 'alert-success' : 'alert-danger'"
                        >{{message}}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profesor/register');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            setTimeout( () => this.$router.push({ path: '/profesor'}), 3000),
            error => {
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped>
*{
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

body{
	background: rgb(219,226,226);
}

.row{
	background: white;
	border-radius: 30px;
	box-shadow: 12px 12px 22px grey;
}

img{
	border-top-left-radius: 30px;
	border-bottom-left-radius: 30px;
}

.btn1{
	border:none;
	outline: none;
	height: 50px;
	width: 100%;
	background-color: #1573d0;
	color: white;
	border-radius: 4px;
	font-weight: bold;
}

.btn1:hover{
	background-color: white;
	border:1px solid #1573d0;
	color: #1573d0;
}
</style>