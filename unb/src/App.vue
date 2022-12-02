<template>
  <nav>
    <div class="nav-item-wrap">
      <router-link to="/about">밸런스게임</router-link>
      <router-link to="/about">토론리스트</router-link>
      <router-link to="/"><img src="../src/assets/로고1.png" class="nav-logo"></router-link>
      <router-link to="/about">회원가입</router-link>
      <router-link to="/about">로그인</router-link>
    </div>
  </nav>
  <div class="container">
    <router-view/>
  </div>
</template>

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

nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  box-shadow: 0 0 20px rgba(133, 133, 133, 0.378);
  background-color: white;
  z-index: 1;
}
nav a {
  color: black;
  text-decoration: none;
}
nav a.router-link-exact-active {
  font-weight: bold;
}
.nav-item-wrap {
  width: 920px;
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo {
  height: 40px;
}
.container {
  width: 920px;
  margin: 0 auto;
  margin-top: 50px;
}
</style>
