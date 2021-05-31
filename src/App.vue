<template>
  <div id="app">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showStudentBoard() {
      if (this.currentUser && this.currentUser.user.sumEduPersonAffiliation) {
        return this.currentUser.user.sumEduPersonAffiliation.includes('student');
      }


      return false;
    },
    showProfesorBoard() {
      if (this.currentUser && this.currentUser.uloga) {
        return this.currentUser.uloga.includes('profesor');
      }


      return false;
    },
    showAsistentBoard() {
      if (this.currentUser && this.currentUser.uloga) {
        return this.currentUser.uloga.includes('asistent');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
