<template>
  <div v-if="logincheck">
    <h1> 로그인 유지중 </h1>
    <router-link :to="{ path: '/userprofile/' + pk }">유저정보</router-link>
  </div>
  <div v-else>
    <h1> 로그인 안함 </h1>
  </div>
</template>
<script>
import loginStore from '../store/index'
export default {
  data () {
    return {
      logincheck: '',
      pk: ''
    }
  },
  mounted() {
    this.logincheck = loginStore.state.loginStore.isLogin
    this.pk = loginStore.state.loginStore.userInfo.pk
  }
}
</script>
