<template>
  <div>
    <nav v-if="!responsive">
      <div class="nav-item-wrap">
        <!-- 밸런스게임 to 랜덤으로 수정 필요 -->
        <div class="left-nav">
          <a :href="'/Detail/'+random_index">밸런스게임</a>
          <router-link to="/all-list">토론리스트</router-link>
          <router-link to="/create-game" v-if="logincheck">만들기</router-link>
        </div>
        <router-link to="/"><img src="../assets/로고1.png" class="nav-logo"></router-link>
        <div class="right-nav" v-if="logincheck">
          <a @click="mypage()"
          :class="{'selected': this.$route.path === '/userprofile/' + userInfo.pk }">
          마이페이지</a>
          <a @click="logoutplz()">로그아웃</a>
        </div>
        <div class="right-nav" v-else>
          <router-link to="/signup">회원가입</router-link>
          <router-link to="/login">로그인</router-link>
        </div>
      </div>
    </nav>

    <nav class="navbar" v-else>
      <div class="navbar-container">
        <router-link to="/"><img src="../assets/로고1.png" class="nav-logo"></router-link>
        <input type="checkbox" name="" id="">
        <div class="hamburger-lines">
          <span class="line line1"></span>
          <span class="line line2"></span>
          <span class="line line3"></span>
        </div>
        <ul class="menu-items">
          <li><router-link to="/">홈으로</router-link></li>
          <li><a :href="'/Detail/'+random_index">밸런스게임</a></li>
          <!-- 로그인 했을 때 -->
          <div v-if="logincheck">
            <li><router-link to="/create-game" v-if="logincheck">만들기</router-link></li>
            <hr style="width: 70%; margin: 30px auto; color: gray">
            <li><a @click="mypage()">마이페이지</a></li>
            <li><a @click="logoutplz()">로그아웃</a></li>
          </div>
          <div v-else>
            <hr style="width: 70%; margin: 0 auto 30px; color: gray">
            <li><router-link to="/signup">회원가입</router-link></li>
            <li><router-link to="/login">로그인</router-link></li>
          </div>
        </ul>
      </div>
    </nav>

  </div>
</template>
<script>
import loginStore from '../store/index'
import axios from '../axios/index'
export default {
  components: {},
  data () {
    return {
      logincheck: '',
      pk: '',
      userInfo: loginStore.state.loginStore.userInfo,
      random_index: '',
      responsive: false,
    }
  },
  setup () {},
  created () {
    var innerWidth = window.innerWidth;
      innerWidth <= "650" ? this.responsive = true : this.responsive = false;
  },
  mounted() {
    this.logincheck = loginStore.state.loginStore.isLogin
    // console.log('↓↓로그인 여부 ↓↓')
    // console.log(loginStore.state.loginStore.isLogin)
    axios.get('https://www.unbback.cf/articles/random/article/')
    .then((response) =>{
      this.random_index = response.data.article_pk
    })
    window.addEventListener('resize', this.handleResize);
  },
  unmounted () {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    logoutplz () {
      this.$store.dispatch('logouttest_act')
    },
    handleResize(event) {
      var innerWidth = window.innerWidth;
      innerWidth <= "650" ? this.responsive = true : this.responsive = false;
    },
    mypage() {
      window.location.href="https://www.unbalace.cf/userprofile/" + this.userInfo.pk
    }
  }
}
</script>
<style scoped>
*,
*::after,
*::before{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  box-shadow: 0 0 20px rgba(133, 133, 133, 0.378);
  background-color: white;
  z-index: 1000;
}
nav a {
  color: black;
  text-decoration: none;
}
nav a.router-link-exact-active {
  font-weight: bold;
}
.selected {
  font-weight: bold;
}
.nav-item-wrap {
  max-width: 920px;
  padding: 0 20px;
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo {
  height: 40px;
}
.left-nav {
  display: flex;
  justify-content: flex-start;
  width: 400px;
}
.left-nav>a {
  margin: 0 10px;
}
.right-nav {
  display: flex;
  justify-content: flex-end;
  width: 400px;
}
.right-nav>a {
  margin: 0 10px;
}

/* 650px 이하 */
@media (max-width: 650px){
    .navbar{
        opacity: 0.95;
    }

    .navbar-container input[type="checkbox"],
    .navbar-container .hamburger-lines{
        display: block;
    }

    .navbar-container{
        display: block;
        position: relative;
        height: 50px;
        margin: 0;
    }
    .navbar-container>a>img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .navbar-container input[type="checkbox"]{
        position: absolute;
        display: block;
        height: 26px;
        width: 33px;
        top: 50%;
        transform: translate(0, -50%);
        left: 20px;
        z-index: 5;
        opacity: 0;
        cursor: pointer;
    }

    .navbar-container .hamburger-lines{
        display: block;
        height: 26px;
        width: 33px;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        left: 20px;
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .navbar-container .hamburger-lines .line{
        display: block;
        height: 4px;
        width: 100%;
        border-radius: 10px;
        background: #333;
    }
    
    .navbar-container .hamburger-lines .line1{
        transform-origin: 0% 0%;
        transition: transform 0.3s ease-in-out;
    }

    .navbar-container .hamburger-lines .line2{
        transition: transform 0.2s ease-in-out;
    }

    .navbar-container .hamburger-lines .line3{
        transform-origin: 0% 100%;
        transition: transform 0.3s ease-in-out;
    }

    .navbar .menu-items{
        padding-top: 100px;
        background: #fff;
        height: 100vh;
        max-width: 300px;
        transform: translate(-150%);
        display: flex;
        flex-direction: column;
        margin-left: -40px;
        padding-left: 40px;
        transition: transform 0.5s ease-in-out;
        box-shadow:  5px 0px 10px 0px #aaa;
        overflow: scroll;
    }

    .navbar .menu-items li{
        margin-bottom: 1.8rem;
        font-size: 1.1rem;
        font-weight: 500;
        list-style: none;
    }

    .logo{
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 2.5rem;
    }

    .navbar-container input[type="checkbox"]:checked ~ .menu-items{
        transform: translateX(0);
    }

    .navbar-container input[type="checkbox"]:checked ~ .hamburger-lines .line1{
        transform: rotate(45deg);
    }

    .navbar-container input[type="checkbox"]:checked ~ .hamburger-lines .line2{
        transform: scaleY(0);
    }

    .navbar-container input[type="checkbox"]:checked ~ .hamburger-lines .line3{
        transform: rotate(-45deg);
    }
  
}
</style>
