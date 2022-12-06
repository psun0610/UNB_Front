<template>
  <div v-if="logincheck">
    <h1> 로그인 유지중 </h1>
    <router-link :to="{ path: '/userprofile/' + i }">유저정보</router-link>
  </div>
  <div v-else>
    <h1> 로그인 안함 </h1>
  </div>
</template>
<script>
export default {
  data () {
    return {
      logincheck: JSON.parse(sessionStorage.vuex).loginStore.isLogin,
      i: JSON.parse(sessionStorage.vuex).loginStore.userInfo.pk
    }
  }
}
</script>
