<template>
  <div class="login-container my-shadow">
    <div class="myform">
      <h1 class="form-title">로그인</h1>
      <div class="input-wrap">
        <label for="email">이메일</label>
        <input type="email" id="email" v-model="email" class="input-text"/>
      </div>
      <div class="input-wrap">
        <label for="password">패스워드</label>
        <input type="password" id="password" v-model="password" class="input-text"/>
      </div>
      <div style="max-width: 350px; margin: 0 auto;">
        <button @click="loginSubmit()" class="form-btn my-shadow">로그인</button>
      </div>
      <a href="/signup" class="alert-text signup-text">회원이 아니신가요?</a>
      <div class="social-text">
        <hr>
        <div class="alert-text" style="margin: 10px;">소셜로 로그인하기</div>
        <hr>
      </div>
      <div class="social-container">
        <img @click="googlelogin()" src='../assets/구글로그인2.png' class="google_btn my-shadow"> 
        <img @click="kakaologin()" src='../assets/카카오로그인2.png' class="kakao_btn my-shadow">
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
      const SOCIAL_AUTH_GOOGLE_CLIENT_ID= process.env.VUE_APP_SOCIAL_AUTH_GOOGLE_CLIENT_ID
      const GOOGLE_CALLBACK_URI= 'https://www.unbalace.cf/login'
      const scope = "https://www.googleapis.com/auth/userinfo.email"
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${SOCIAL_AUTH_GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${GOOGLE_CALLBACK_URI}&scope=${scope}`
    },
    kakaologin() {
      const KAKAO_REST_API_KEY =process.env.VUE_APP_KAKAO_REST_API_KEY
      const KAKAO_REDIRECT_URI = 'https://www.unbalace.cf/login'
      window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&scope=account_email`
  }
}
}
</script>

<style scoped>
.login-container {
  max-width: 550px;
  margin: 20vh auto 0;
}
.form-title {
  text-align: center;
  margin-bottom: 70px;
  font-size: 23px;
  font-weight: 500;
  margin-top: 0;
}
.input-wrap {
  max-width: 350px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}
.myform {
  padding: 10vmin 15px;
}
.input-wrap>label {
  width: 95px;
  text-align: start;
}
.input-text {
  max-width: 250px;
  padding: 7px 10px;
  border: 1px solid rgb(180, 180, 180);
  border-radius:  3px;
  font-size: 15px;
}
.form-btn {
  display: block;
  width: 100%;
  background-color: pink;
  border: 0;
  padding: 7px 0;
  margin-top: 40px;
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
.alert-text {
  display: block;
  font-size: 15px;
  color: gray;
  margin: 15px 0;
}
.social-text {
  display: flex;
  align-items:center;
  justify-content: center;
  margin: 40px 0 20px;
}
.signup-text:hover {
  color: black;
}
.social-text>hr {
  color: lightgray;
  width: 20%;
  margin: 0;
}
.social-container {
  display: flex;
  justify-content: center;
}
.social-container>img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  padding: 0;
  margin: 0 15px;
}
@media (max-width: 600px) {
  .social-container>img {
    width: 50px;
    height: 50px;
  }
}
@media (max-width: 380px) {
  .input-wrap {
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
  }
  .input-wrap>label {
    margin-bottom: 5px;
  }
  .input-wrap>input {
    max-width: 100%;
  }
}
</style>
