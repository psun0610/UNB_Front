<template>
  <nav>
    <div class="nav-item-wrap">
      <!-- 밸런스게임 to 랜덤으로 수정 필요 -->
      <div class="left-nav">
        <router-link to="/balance-game">밸런스게임</router-link>
        <router-link to="/all-list">토론리스트</router-link>
        <router-link to="/create-game">만들기</router-link>
      </div>
      <router-link to="/"><img src="../assets/로고1.png" class="nav-logo"></router-link>
      <div class="right-nav">
        <router-link to="/signup">회원가입</router-link>
        <router-link to="/login">로그인</router-link>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      sampleData: ''
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {}
}
</script>
<style scoped>


nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  box-shadow: 0 0 20px rgba(133, 133, 133, 0.378);
  background-color: white;
  z-index: 1;
}
nav a {
  color: black;
  text-decoration: none;
}
nav a.router-link-exact-active {
  font-weight: bold;
}
.nav-item-wrap {
  max-width: 920px;
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo {
  height: 40px;
}
.left-nav {
  display: flex;
  justify-content: flex-start;
  width: 400px;
}
.left-nav>a {
  margin: 0 10px;
}
.right-nav {
  display: flex;
  justify-content: flex-end;
  width: 400px;
}
.right-nav>a {
  margin: 0 10px;
}
</style>
