<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <div>
        <label for="nickname">아이디(nickname)</label>
        <input type="text" id="nickname" v-model="nickname" />
      </div>
      <div>
        <label for="email">email</label>
        <input type="text" id="email" v-model="email" />
      </div>
      <div>
        <label for="password1">비밀번호</label>
        <input type="password" id="password1" v-model="password1" />
      </div>
      <div>
        <label for="password2">비밀번호 확인</label>
        <input type="password" id="password2" v-model="password2" />
      </div>
      <button type="submit">회원가입</button>
    </form>
  </div>
</template>
<script>
import axios from '../axios/index'

export default {
  name: 'SignupForm',
  data () {
    return {
      email: '',
      password1: '',
      password2: '',
      nickname: ''
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {
    submitForm () {
      axios.post('http://localhost:8000/accounts/registration', this.$data)
        .then(response => {
          console.log('회원가입 성공')
          console.log(response)
          const token = response.data.access_token
          localStorage.setItem('access_token', token) // 토큰을 저장함
          const refretoken = response.data.refresh_token
          localStorage.setItem('refresh_token', refretoken) // 토큰을 저장함
          this.$store.dispatch('getMemberInfo') // 유저 정보를 가져오는 actions 호출
        })
        .catch(response => {
          console.log('fail', this, response)
        })
    }
  }
}
</script>
