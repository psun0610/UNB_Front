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
        <input type="email" id="email" v-model="email" class="input-text"/>
      </div>
      <div class="input-wrap">
        <label for="password1">비밀번호<span style="color: rgb(255, 69, 37)">*</span></label>
        <input type="password" id="password1" v-model="password1" class="input-text"/>
      </div>
      <div class="input-wrap">
        <label for="password2">비밀번호 확인<span style="color: rgb(255, 69, 37)">*</span></label>
        <input type="password" id="password2" v-model="password2" class="input-text"/>
      </div>
      <div style="max-width: 350px; margin: 0 auto;">
        <button type="submit" class="form-btn my-shadow">회원가입</button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
const url = 'https://www.unbback.cf/accounts/';

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
      if(!this.nickname || !this.email || !this.password1 || !this.password2){
        alert('필수 항목을 입력해주세요.')
      }
      axios.post(url + 'registration', this.$data)
        .then(response => {
          // console.log('회원가입 성공')
          // console.log(response)
          const token = response.data.access_token
          localStorage.setItem('access_token', token) // 토큰을 저장함
          const refretoken = response.data.refresh_token
          localStorage.setItem('refresh_token', refretoken) // 토큰을 저장함
          this.$store.dispatch('getMemberInfo') // 유저 정보를 가져오는 actions 호출
          alert('회원가입 성공')
          // router.push('logincheck')
        })
        .catch(error => {
          const err = error.response.data
          try {
            if (err.non_field_errors[0] == '비밀번호가 email와 너무 유사합니다.'){
              alert('비밀번호가 email와 너무 유사합니다.')
            }
          } catch(e) {}
          try {
            if (err.password1) {
              alert(err.password1)
            }
          } catch(e) {}
          try {
            if(err.email[0] == "이미 이 이메일 주소로 등록된 사용자가 있습니다.") {
              alert(err.email[0])
            }
          } catch(e) {

          }
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
  max-width: 550px;
  margin: 20vh auto 0;
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

@media (max-width: 600px) {
  .social-container>img {
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 410px) {
  .input-wrap {
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    align-content: start;
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