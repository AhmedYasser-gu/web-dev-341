<template>
  <div id="app">
    <div id="nav">
      <b-button v-on:click="buttonAction('/')">Start up page</b-button> |
      <b-button v-on:click="buttonAction('/homepage')">Home page</b-button> |
      <b-button v-on:click="buttonAction('/movies')">Movies</b-button> |
      <b-button v-on:click="buttonAction('/tvshows')">Tv Shows</b-button>
    </div>
    <!-- Render the content of the current page view -->
    <router-view />

    <br />
    <br />
    <br />
    <my-footer />
    <div id="router"></div>
  </div>
</template>

<script>
import MyFooter from '@/components/MyFooter.vue'
import image from '@/assets/logo.png'

export default {
  mounted() {
    document.getElementById('router').innerHTML = this.$route.query.userEmail
  },
  methods: {
    buttonAction(destination) {
      this.$router.push({
        path: destination,
        query: { userEmail: document.getElementById('router').innerHTML }
      })
    }
  },
  data: function () {
    return {
      image: image
    }
  },
  components: {
    MyFooter
  }
}
</script>

<style>
.footer {
  padding-top: 100px;
  padding-right: 30px;
  padding-bottom: 50px;
  padding-left: 80px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #d72323;
}
#router {
  color: rgb(255, 255, 255);
}
</style>
