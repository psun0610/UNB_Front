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
      <div>
        <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=594914704717-2s7b5k1fjai3o89vnc66hc0fiisa15uq.apps.googleusercontent.com&response_type=code&redirect_uri=http://localhost:8080/login&scope=https://www.googleapis.com/auth/userinfo.email">
        구글로그인
        </a>
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
  methods: {
    loginSubmit () {
      const saveData = {}
      saveData.email = this.email
      saveData.password = this.password
      this.$store.dispatch('logintest', saveData)
    },
    googlelogin() {
      axios.get('http://localhost:8000/accounts/google/login')
      .then((response) => {
        console.log(response.data)
      }
      )
      .catch((err) => {
        console.log(err)
      })
      // window.location.href = 'http://localhost:8000/accounts/google/login'
    },
    kakaologin() {
      window.location.href = 'http://localhost:8000/accounts/kakao/login'

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
</style>
