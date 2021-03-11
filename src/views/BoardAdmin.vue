<template>
  <div class="container" id="example-1">
      <nav class="navbar">
        <div class="nav_icon" onclick="toggleSidebar()">
          <i class="fa fa-bars" aria-hidden="true"></i>
        </div>
        <div class="navbar__left">
          <a class="active_link" href="#">Admin</a>
        </div>
        <div class="navbar__right">
          <a href="#">
            <font-awesome-icon icon="search" />
          </a>
          <a href="#">
            <font-awesome-icon icon="clock" />
          </a>
          <a href="#">
            <img width="30" src="images/avatar.svg" alt="" />
            <!-- <i class="fa fa-user-circle-o" aria-hidden="true"></i> -->
          </a>
        </div>
      </nav>

      <main v-show='analytics'>
        <div class="main__container">
          <!-- MAIN TITLE STARTS HERE -->

          <div class="main__title">
            <img src="images/hello.svg" alt="" />
            <div v-if="currentUser" class="main__greeting">
              <h1>Pozdrav {{ currentUser.ime }}</h1>
            </div>
          </div>

          <!-- MAIN TITLE ENDS HERE -->

          <!-- MAIN CARDS STARTS HERE -->
          <div class="main__cards">
            <div class="card">
              <i
                class="fa fa-user-o fa-2x text-lightblue"
                aria-hidden="true"
              ></i>
              <div class="card_inner">
                <p class="text-primary-p">Broj studenata</p>
                <span class="font-bold text-title">60</span>
              </div>
            </div>

            <div class="card">
              <i class="fa fa-bar-chart fa-2x text-red" aria-hidden="true"></i>
              <div class="card_inner">
                <p class="text-primary-p">Dolasci</p>
                <span class="font-bold text-title">90%</span>
              </div>
            </div>

            <div class="card">
              <i
                class="fa fa-hand-peace-o fa-2x text-yellow"
                aria-hidden="true"
              ></i>
              <div class="card_inner">
                <p class="text-primary-p">Aktivnih<br>studenata</p>
                <span class="font-bold text-title">39</span>
              </div>
            </div>

            <div class="card">
              <i
                class="fa fa-calendar-check-o fa-2x text-green"
                aria-hidden="true"
              ></i>
              <div class="card_inner">
                <p class="text-primary-p">Ispričanih<br>studenata</p>
                <span class="font-bold text-title">3</span>
              </div>
            </div>
          </div>
          <!-- MAIN CARDS ENDS HERE -->

          <!-- CHARTS STARTS HERE -->
          <div class="charts">
            <div class="charts__left">
              <div class="charts__left__title">
                <div>
                  <h1>Dnevni izvještaj</h1>
                </div>
                <i class="fa fa-flag-o" aria-hidden="true"></i>
              </div>
              <div id="apex1"></div>
            </div>

            <div class="charts__right">
              <div class="charts__right__title">
                <div>
                  <h1>Fakultet strojarstva, računarstva i elektrotehnike</h1>
                </div>
                <i class="fa fa-flag-o" aria-hidden="true"></i>
              </div>

              <div class="charts__right__cards">
                <div class="card1">
                  <h1>Popis studenata</h1>
                </div>

                <div class="card2">
                  <h1>Napravi izvještaj</h1>
                </div>

                <div class="card3">
                  <h1>Datumi nastave</h1>
                </div>

                <div class="card4">
                  <h1>Raspored</h1>
                </div>
              </div>
            </div>
          </div>
          <!-- CHARTS ENDS HERE -->
        </div>
      </main>

      <!-- ISPIS TERMINA -->
      <main v-show='listTermins'>
        <div class="main__container">
          <ul>
            <li @click='analytics = false; listTermins= false; listStudents=true;' class="list termins" v-for="content in terminicontents" :key="content.datum">
              <font-awesome-icon icon="book" />
                <span @click='getStudentid(content.id)'> {{ content.datum }} </span>
            </li>
          </ul>
        </div>
      </main>

      <!-- ISPIS STUDENATA -->
      <main v-show='listStudents'>
        <table class="table table-bordered" ref="printTable">
          <thead class="thead-dark">
            <tr>
              <th scope="col">BROJ INDEXA</th>
              <th scope="col">IME</th>
              <th scope="col">PREZIME</th>
              <th scope="col">VRIJEME DOLASKA</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="content in studenticontents" :key="content.korisnik">
              <th scope="row">{{ content.korisnik.brojIndexa }}</th>
              <td>{{ content.korisnik.ime }}</td>
              <td>{{ content.korisnik.prezime }}</td>
              <td>{{ content.createdAt }}</td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-dark font-weight-bold text-white p-1 mr-5 mt-3 float-right" @click="printData"> <font-awesome-icon icon="print" /> Ispis </button>
      </main>

      <div id="sidebar">
        <div class="sidebar__title">
          <div class="sidebar__img">
            <img src="../assets/logo2.png" alt="logo" />
            <h1>FSRE</h1>
          </div>
          <i
            onclick="closeSidebar()"
            class="fa fa-times"
            id="sidebarIcon"
            aria-hidden="true"
          ></i>
        </div>

        <div class="sidebar__menu">
          <div class="sidebar__link active_menu_link">
            <i class="fa fa-home"></i>
            <a href="#">Nadzorna ploča</a>
          </div>

          <h2>OPĆENITO</h2>
          <div class="sidebar__link">
            <i class="fa fa-user-secret" aria-hidden="true"></i>
            <a href="#" @click='analytics = true; listTermins=false'>Administratorsko upravljanje</a>
          </div>
          <div class="sidebar__link">
            <i class="fa fa-wrench"></i>
            <a href="#">Postavke</a>
          </div>
          <!-- ISPIS KOLEGIJA -->
          <h2>KOLEGIJI</h2>
          <div class="sidebar__link">
            <ul>
              <li  @click='analytics = false; listTermins= true; listStudents=false;' class="sidebar__link" v-for="content in kolegijicontents" :key="content.naziv">
                <font-awesome-icon icon="book" />
                <span @click='getTerminid(content.id)'> {{ content.naziv }}</span>
              </li>
            </ul>
          </div>
          
          <div class="sidebar__logout">
            <font-awesome-icon icon="sign-out-alt" />
            <a href @click.prevent="logOut"> Odjavi se</a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {GetStudents} from '../services/studenti.service';
import {GetTermins} from '../services/termini.service';
import KolegijiService from '../services/kolegiji.service';

export default {
  name: 'Admin',
  el: '#example-1',
  data() {
    return {
      kolegijicontents: [],
      terminicontents: [],
      studenticontents: [],
      analytics: true,
      listTermins: false,
      listStudents: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    printData()
    {
      var divToPrint= this.$refs.printTable
      this.newWin= window.open("")
      this.newWin.document.write(divToPrint.outerHTML);
      this.newWin.print();
      this.newWin.close();
    },
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    getTerminid: function(id){
      GetTermins.getTermini(id).then(
      response => {
        this.terminicontents = response.data;
      },
      error => {
        this.terminicontents =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    },
    getStudentid: function(id){
      GetStudents.getStudent(id).then(
      response => {
        this.studenticontents = response.data[0].ucionica.evidencijas;
      },
      error => {
        this.terminicstudenticontentsontents =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    }
  },
  mounted() {
    KolegijiService.getKolegiji(this.$store.state.auth.user.brojIndexa).then(
      response => {
        this.kolegijicontents = response.data;
      },
      error => {
        this.kolegijicontents =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    )
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap");

/*  styling scrollbars  */
::-webkit-scrollbar {
  width: 5px;
  height: 6px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #a5aaad;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #3ea175;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a5aaad;
}

* {
  margin: 0;
  padding: 0;
}

body {
  box-sizing: border-box;
  font-family: "Lato", sans-serif;
}

.text-primary-p {
  color: #a5aaad;
  font-size: 14px;
  font-weight: 700;
}

.font-bold {
  font-weight: 700;
}

.text-title {
  color: #2e4a66;
}

.text-lightblue {
  color: #469cac;
}

.text-red {
  color: #cc3d38;
}

.text-yellow {
  color: #a98921;
}

.text-green {
  color: #3b9668;
}

.container {
  display: grid;
  height: 100vh;
  grid-template-columns: 0.8fr 1fr 1fr 1fr;
  grid-template-rows: 0.2fr 3fr;
  grid-template-areas:
    "sidebar nav nav nav"
    "sidebar main main main";
  /* grid-gap: 0.2rem; */
}

.navbar {
  background: #ffffff;
  grid-area: nav;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px 0 30px;
  border-bottom: 1px solid lightgray;
}

.nav_icon {
  display: none;
}

.nav_icon > i {
  font-size: 26px;
  color: #a5aaad;
}

.navbar__left > a {
  margin-right: 30px;
  text-decoration: none;
  color: #a5aaad;
  font-size: 15px;
  font-weight: 700;
}

.navbar__left .active_link {
  color: #265acc;
  border-bottom: 3px solid #265acc;
  padding-bottom: 12px;
}

.navbar__right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar__right > a {
  margin-left: 20px;
  text-decoration: none;
}

.navbar__right > a > i {
  color: #a5aaad;
  font-size: 16px;
  border-radius: 50px;
  background: #ffffff;
  box-shadow: 2px 2px 5px #d9d9d9, -2px -2px 5px #ffffff;
  padding: 7px;
}

main {
  background: #f3f4f6;
  grid-area: main;
  overflow-y: auto;
}

.main__container {
  padding: 20px 35px;
}

.main__title {
  display: flex;
  align-items: center;
}

.main__title > img {
  max-height: 100px;
  object-fit: contain;
  margin-right: 20px;
}

.main__greeting > h1 {
  font-size: 24px;
  color: #2e4a66;
  margin-bottom: 5px;
}

.main__greeting > p {
  font-size: 14px;
  font-weight: 700;
  color: #a5aaad;
}

.main__cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 30px;
  margin: 20px 0;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 70px;
  padding: 25px;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #ffffff;
}

.card_inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card_inner > span {
  font-size: 25px;
}

.charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 50px;
}

.charts__left {
  padding: 25px;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #ffffff;
}

.charts__left__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.charts__left__title > div > h1 {
  font-size: 24px;
  color: #2e4a66;
  margin-bottom: 5px;
}

.charts__left__title > div > p {
  font-size: 14px;
  font-weight: 700;
  color: #a5aaad;
}

.charts__left__title > i {
  color: #ffffff;
  font-size: 20px;
  background: #ffc100;
  border-radius: 200px 0px 200px 200px;
  -moz-border-radius: 200px 0px 200px 200px;
  -webkit-border-radius: 200px 0px 200px 200px;
  border: 0px solid #000000;
  padding: 15px;
}

.charts__right {
  padding: 25px;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #ffffff;
}

.charts__right__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.charts__right__title > div > h1 {
  font-size: 24px;
  color: #2e4a66;
  margin-bottom: 5px;
}

.charts__right__title > div > p {
  font-size: 14px;
  font-weight: 700;
  color: #a5aaad;
}

.charts__right__title > i {
  color: #ffffff;
  font-size: 20px;
  background: #39447a;
  border-radius: 200px 0px 200px 200px;
  -moz-border-radius: 200px 0px 200px 200px;
  -webkit-border-radius: 200px 0px 200px 200px;
  border: 0px solid #000000;
  padding: 15px;
}

.charts__right__cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 30px;
}

.card1 {
  background: #d1ecf1;
  color: #35a4ba;
  text-align: center;
  padding: 25px;
  border-radius: 5px;
  font-size: 14px;
}


.card2 {
  background: #d2f9ee;
  color: #38e1b0;
  text-align: center;
  padding: 25px;
  border-radius: 5px;
  font-size: 14px;
}

.card3 {
  background: #d6d8d9;
  color: #3a3e41;
  text-align: center;
  padding: 25px;
  border-radius: 5px;
  font-size: 14px;
}

.card4 {
  background: #fddcdf;
  color: #f65a6f;
  text-align: center;
  padding: 25px;
  border-radius: 5px;
  font-size: 14px;
}

.termins{
  cursor: pointer;
}

/*  SIDEBAR STARTS HERE  */

#sidebar {
  background: #020509;
  grid-area: sidebar;
  overflow-y: auto;
  padding: 20px;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}

.sidebar__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #f3f4f6;
  margin-bottom: 30px;
  /* color: #E85B6B; */
}

.sidebar__img {
  display: flex;
  align-items: center;
}

.sidebar__title > div > img {
  width: 75px;
  object-fit: contain;
}

.sidebar__title > div > h1 {
  font-size: 18px;
  display: inline;
}

.sidebar__title > i {
  font-size: 18px;
  display: none;
}

.sidebar__menu > h2 {
  color: #3ea175;
  font-size: 16px;
  margin-top: 15px;
  margin-bottom: 5px;
  padding: 0 10px;
  font-weight: 700;
}

.sidebar__link {
  cursor:pointer;
  list-style-type: none;
  color: #f3f4f6;
  padding: 10px;
  border-radius: 3px;
  margin-bottom: 5px;
}

.list {
  list-style-type: none;
  color: black;
  padding: 10px;
  border-radius: 3px;
  margin-bottom: 5px;
}

.active_menu_link {
  background: rgba(62, 161, 117, 0.3);
  color: #3ea175;
}

.active_menu_link a {
  color: #3ea175 !important;
}

.sidebar__link > a {
  text-decoration: none;
  color: #a5aaad;
  font-weight: 700;
}

.sidebar__link > i {
  margin-right: 10px;
  font-size: 18px;
}

.sidebar__logout {
  margin-top: 20px;
  padding: 10px;
  color: #e65061;
}

.sidebar__logout > a {
  text-decoration: none;
  color: #e65061;
  font-weight: 700;
  text-transform: uppercase;
}

.sidebar__logout > i {
  margin-right: 10px;
  font-size: 18px;
}

.sidebar_responsive {
  display: inline !important;
  z-index: 9999 !important;
  left: 0 !important;
  position: absolute;
}

@media only screen and (max-width: 978px) {
  .container {
    grid-template-columns: 1fr;
    /* grid-template-rows: 0.2fr 2.2fr; */
    grid-template-rows: 0.2fr 3fr;
    grid-template-areas:
      "nav"
      "main";
  }

  #sidebar {
    display: none;
  }

  .sidebar__title > i {
    display: inline;
  }

  .nav_icon {
    display: inline;
  }
}

@media only screen and (max-width: 855px) {
  .main__cards {
    grid-template-columns: 1fr;
    gap: 10px;
    margin-bottom: 0;
  }

  .charts {
    grid-template-columns: 1fr;
    margin-top: 30px;
  }
}

@media only screen and (max-width: 480px) {
  .navbar__left {
    display: none;
  }
}

</style>
