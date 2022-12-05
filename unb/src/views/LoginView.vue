<template>
  <div class="app">
    <div>
      <label for="nickname">
        <span>아이디</span>
        <input type="text" id="nickname" v-model="nickname" />
      </label>
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
