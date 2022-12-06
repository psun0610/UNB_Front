<template>
  <div class="login-container my-shadow">
    <form class="myform">
      <h1 class="form-title">로그인</h1>
      <div class="input-wrap">
        <label for="nickname">아이디</label>
        <input type="text" id="nickname" v-model="nickname" class="input-text"/>
      </div>
      <div class="input-wrap">
        <label for="email">이메일</label>
        <input type="text" id="email" v-model="email" class="input-text"/>
      </div>
      <div class="input-wrap">
        <label for="password">패스워드</label>
        <input type="password" id="password" v-model="password" class="input-text"/>
      </div>
        <button @click="loginSubmit()" class="form-btn my-shadow">로그인</button>
        <button @click="logoutplz()" class="form-btn my-shadow">로그아웃</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: null,
      password: null,
      nickname: null
    }
  },
  methods: {
    loginSubmit () {
      const saveData = {}
      saveData.email = this.email
      saveData.password = this.password
      saveData.nickname = this.nickname
      this.$store.dispatch('logintest', saveData)
    },
    logoutplz () {
      this.$store.dispatch('logouttest_act')
    }
  }
}
</script>
<style scoped>
.login-container {
  width: 550px;
  margin: 200px auto;
}
</style>
