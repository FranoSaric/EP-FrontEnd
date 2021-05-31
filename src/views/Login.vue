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
                    <h4>Prijavite se</h4>
                    <form name="form" @submit.prevent="handleLogin">
                        <div class="form-row">
                            <div class="col-lg-12">
                                <input
                                    v-model="user.email"
                                    v-validate="'required'"
                                    type="text"
                                    class="form-control my-3 p-4"
                                    name="email"
                                    placeholder="E-mail"
                                />
                                <div
                                    v-if="errors.has('email')"
                                    class="alert alert-danger"
                                    role="alert"
                                >Email je potreban!</div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-lg-12">
                                <input
                                    v-model="user.lozinka"
                                    v-validate="'required'"
                                    type="password"
                                    class="form-control my-3 p-4"
                                    name="lozinka"
                                    placeholder="Lozinka"
                                />
                                <div
                                    v-if="errors.has('lozinka')"
                                    class="alert alert-danger"
                                    role="alert"
                                >Lozinka je potrebna!</div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-lg-12">
                                <button class="btn1 mt-3 mb-5 btn-primary btn-block" :disabled="loading">
                                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                    <span> Prijavi se</span>
                                  </button>
                            </div>
                        </div>
                        <div class="form-group">
                            <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
                        </div>
                        <a href="#">Zaboravili ste lozinku?</a>
                        
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/student');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.email && this.user.lozinka) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/student');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
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