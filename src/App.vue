<template>
  <div id="app">
    <Navbar/>
  </div>
  <div class="container">
    <router-view/>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
import { csrftoken } from './csrf/csrf_token'
export default {
  name: 'App',
  components: {
    Navbar
  },
  methods: {
    getUser() {
      fetch('http://localhost:8000/', {
        methods: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': csrftoken
        }
      })
        .then(resp => resp.json())
        .then((data) => {
          const username = data.username
          localStorage.setItem('username', username)
        })
        .catch(error => console.log(error))
    },
    create() {
      this.getAllArticles()
    }
  },
  created() {
    // this.getUser()
  }
}
</script>
<style>
@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: 300, 400, 500, 700;
  font-style: normal;
}
@font-face {
  font-family: 'UhBeeJJIBBABBA';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_five@.2.0/UhBeeJJIBBABBA.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'UhBeeBanynany';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_five@.2.0/UhBeeBanynany.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'UhBeeHYUNJUNG';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_five@.2.0/UhBeeHYUNJUNG.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
.no-kg-font {
  font-family: 'Pretendard-Regular';
}
:root {
  --mypink: #FF719B;
  --myblue: #4BBEFF;
}
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
  font-family: 'Pretendard-Regular';
  text-align: center;
}
a {
  color: black;
  text-decoration: none;
}
.my-shadow {
  box-shadow: 2px 2px 10px rgba(133, 133, 133, 0.378);
}
.kg-font {
  font-family: 'UhBeeHYUNJUNG';
}
.container {
  max-width: 920px;
  margin: 0 auto;
  margin-top: 50px;
}
</style>
