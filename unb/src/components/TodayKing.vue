<template>
  <div>
  <!-- 오늘의 토론왕 -->
    <div class="today-king my-shadow">
      <div class="today-king-title">
        오늘의 토론왕<img src="../assets/crown.png" style="width: 50px;">
      </div>
      <div></div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      sampleData:''
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods:{}
}
</script>
<style scoped>
.today-king {
  max-width: 100%;
  height: 50px;
  margin: 120px 0 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 5px solid #4BBEFF;
  border-left: 5px solid #4BBEFF;
  border-bottom: 5px solid #FF719B;
  border-right: 5px solid #FF719B;
  padding: 0 70px;
  font-weight: bold;
}
.today-king-title {
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 17px;
}
</style>