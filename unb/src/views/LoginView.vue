<template>
  <div class="app">
    <div>
      <label for="email">
        <span>이메일</span>
        <input type="text" id="email" v-model="email" />
      </label>
      <label for="password">
        <span>패스워드</span>
        <input type="password" id="password" v-model="password" />
      </label>
      <hr />
      <button @click="loginSubmit()">로그인</button>
    </div>
    <button @click="logoutplz()">로그아웃</button>
    <button @click="googlelogin()">구글로그인</button>
    <button @click="kakaologin()">카카오</button>
    <a href="https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email&response_type=code&client_id={client_id}&redirect_uri={redirect_uri}">
    구글로그인
    </a>
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
    logoutplz () {
      this.$store.dispatch('logouttest_act')
    },
    googlelogin() {
      axios.get('http://localhost:8000/accounts/google/login', { headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: null
        }
      }
      )
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
