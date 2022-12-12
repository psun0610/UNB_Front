<template>
  <div class="login-container my-shadow">
    <div class="myform">
      <h1 class="form-title">로그인</h1>
      <div class="input-wrap">
        <label for="email">이메일</label>
        <input type="text" id="email" v-model="email" class="input-text"/>
      </div>
      <div class="input-wrap">
        <label for="password">패스워드</label>
        <input type="password" id="password" v-model="password" class="input-text"/>
      </div>
      <button @click="loginSubmit()" class="form-btn my-shadow">로그인</button>
      <div class="sc-login-div">
        <img @click="googlelogin()" src='../assets/구글로그인.png' class="google_btn"> 
        <img @click="kakaologin()" src='../assets/카카오로그인.png' class="kakao_btn">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      email: null,
      password: null
      }
  },
  mounted() {
    const urlSearch = new URLSearchParams(location.search);
    const code = urlSearch.get('code')
    const scope_test = urlSearch.get('scope')
    console.log(code)
    console.log(scope_test)
    if (code != null && scope_test == null) {
      this.$store.dispatch('kakaologin', code)
    } else if (code != null && scope_test) {
      this.$store.dispatch('googlelogin', code)
    } else {
    }
  },
  methods: {
    loginSubmit () {
      const saveData = {}
      saveData.email = this.email
      saveData.password = this.password
      this.$store.dispatch('login', saveData)
    },
    googlelogin() {
      const SOCIAL_AUTH_GOOGLE_CLIENT_ID= "594914704717-2s7b5k1fjai3o89vnc66hc0fiisa15uq.apps.googleusercontent.com"
      const GOOGLE_CALLBACK_URI= 'http://localhost:8080/login'
      const scope = "https://www.googleapis.com/auth/userinfo.email"
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${SOCIAL_AUTH_GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${GOOGLE_CALLBACK_URI}&scope=${scope}`
    },
    kakaologin() {
      const KAKAO_REST_API_KEY ='5382360b9e66802f9a69f0cab2e2349d'
      const KAKAO_REDIRECT_URI = 'http://localhost:8080/login'
      window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&scope=account_email`
  }
}
}
</script>

<style scoped>
.login-container {
  width: 550px;
  margin: 200px auto;
}
.form-title {
  text-align: center;
  margin-bottom: 70px;
  font-size: 23px;
  font-weight: 500;
  margin-top: 0;
}
.input-wrap {
  width: 350px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}
.myform {
  padding: 80px 0;
}
.input-text {
  width: 220px;
  padding: 7px 10px;
  border: 1px solid rgb(180, 180, 180);
  border-radius:  3px;
  font-size: 15px;
}
.form-btn {
  width: 350px;
  background-color: pink;
  border: 0;
  padding: 7px 0;
  margin-top: 50px;
  border-radius:  3px;
  font-family: 'Pretendard-Regular';
  font-size: 15px;
  transition: 0.14s all ease-in;
}
.form-btn:hover {
  background-color: #FF719B;
  font-family: 'Pretendard-Regular';
  color: white;
  transition: 0.14s all ease-in;
}
.google_btn {
  width: 350px;
  border: 0;
  padding: 7px 0;
  border-radius:  3px;
  transition: 0.14s all ease-in;
}
.kakao_btn {
  width: 350px;
  border: 0;
  padding: 7px 0;
  border-radius:  3px;
  transition: 0.14s all ease-in;
}
.sc-login-div{
  width : 350px;
  margin:auto;
}
</style>
