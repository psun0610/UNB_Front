<template>
  <div class="signup-container my-shadow">
    <form @submit.prevent="submitForm" class="myform">
      <h1 class="form-title">회원가입</h1>
      <div class="input-wrap">
        <label for="nickname">닉네임<span style="color: rgb(255, 69, 37)">*</span></label>
        <input type="text" id="nickname" v-model="nickname" class="input-text"/>
      </div>
      <div class="input-wrap">
        <label for="email">이메일<span style="color: rgb(255, 69, 37)">*</span></label>
        <input type="text" id="email" v-model="email" class="input-text"/>
      </div>
      <div class="input-wrap">
        <label for="password1">비밀번호<span style="color: rgb(255, 69, 37)">*</span></label>
        <input type="password" id="password1" v-model="password1" class="input-text"/>
      </div>
      <div class="input-wrap">
        <label for="password2">비밀번호 확인<span style="color: rgb(255, 69, 37)">*</span></label>
        <input type="password" id="password2" v-model="password2" class="input-text"/>
      </div>
      <button type="submit" class="form-btn my-shadow">회원가입</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'SignupForm',
  data () {
    return {
      email: '',
      password1: '',
      password2: '',
      nickname: '',
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {
    submitForm () {
      if (this.password1 != this.password2) {
        alert('비밀번호가 일치하지 않습니다.')
      }
      axios.post('http://localhost:8000/accounts/registration', this.$data)
        .then(response => {
          console.log('회원가입 성공')
          console.log(response)
          const token = response.data.access_token
          localStorage.setItem('access_token', token) // 토큰을 저장함
          const refretoken = response.data.refresh_token
          localStorage.setItem('refresh_token', refretoken) // 토큰을 저장함
          this.$store.dispatch('getMemberInfo') // 유저 정보를 가져오는 actions 호출
          alert('회원가입 성공')
          router.push('logincheck')
        })
        .catch(response => {
          console.log('fail', this, response)
        })
    }
  }
}
</script>
<style scoped>
.form-title {
  text-align: center;
  margin-bottom: 70px;
  font-size: 23px;
  font-weight: 500;
  margin-top: 0;
}
.signup-container {
  width: 550px;
  margin: 200px auto;
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