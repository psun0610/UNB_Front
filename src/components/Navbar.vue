<template>
  <nav>
    <div class="nav-item-wrap">
      <!-- 밸런스게임 to 랜덤으로 수정 필요 -->
      <div class="left-nav">
        <a :href="'/Detail/'+random_index">밸런스게임</a>
        <router-link to="/all-list">토론리스트</router-link>
        <router-link to="/create-game" v-if="logincheck">만들기</router-link>
      </div>
      <router-link to="/"><img src="../assets/로고1.png" class="nav-logo"></router-link>
      <div class="right-nav" v-if="logincheck">
        <a @click="mypage()">        
          마이페이지
        </a>
        <a @click="logoutplz()">로그아웃</a>
      </div>
      <div class="right-nav" v-else>
        <router-link to="/signup">회원가입</router-link>
        <router-link to="/login">로그인</router-link>
      </div>
    </div>
  </nav>
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
      random_index: ''
    }
  },
  setup () {},
  created () {},
  mounted() {
    this.logincheck = loginStore.state.loginStore.isLogin
    console.log('↓↓로그인 여부 ↓↓')
    console.log(loginStore.state.loginStore.isLogin)
    axios.get('https://www.unbback.cf/articles/random/article/')
    .then((response) =>{
      this.random_index = response.data.article_pk
    })
  },
  unmounted () {},
  methods: {
    logoutplz () {
      this.$store.dispatch('logouttest_act')
    },
    mypage() {
      window.location.href="https://www.unbalace.cf/userprofile/" + this.userInfo.pk
    }
  }
}
</script>
<style scoped>
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
.nav-item-wrap {
  max-width: 920px;
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
</style>
