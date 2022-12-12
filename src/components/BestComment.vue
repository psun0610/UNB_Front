<template>
  <div>
    <!-- A B 픽마다 색깔 바꾸기 -->
    <div class="comment-div" :class="{'a_shadow': pick == 1, 'b_shadow': pick == 2}">
      <!-- 댓글 작성자 프로필 -->
      <a :href="purl + `${comment.userpk}` + '/'">
        <img :src="`${comment.userbadge.image}`" class="my-shadow comment-profile-img">
      </a>
    </div>
    
  </div>
</template>
<script>

export default {

  // props: ['comment', 'pick'],
  props: {
    'comment': Object,
    'pick': Number,
  },
  data () {
    return {
      purl: 'https://www.unbalace.cf/userprofile/',
    }
  },
  mounted () {
    console.log(this.comment.content)
    console.log(this.pick)
  },
  unmounted () {},
  methods:{}
}
</script>
<style scoped>
.a_shadow {
  box-shadow: rgba(255, 113, 155, 0.5) 4px 2px 16px 0px;
}
.b_shadow {
  box-shadow: rgba(75, 172, 242, 0.5) 4px 2px 16px 0px;
}
.comment-div {
  display: flex;
  align-items: center;
  padding: 10px 30px;
  margin: 30px 0;
}
.comment-profile-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}
.comment {
  width: 100%;
  margin-left: 20px;
}
.comment-profile {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.comment-name {
  margin: 0;
  font-size: 17px;
  font-weight: bold;
  text-align: start;
}
.comment-content {
  width: 100%;
  text-align: start;
}
.comment button {
  background-color: rgb(107, 107, 107);
  border: 0;
  border-radius: 3px;
  color: white;
  font-size: 15px;
}
.heart {
  margin: 0 8px;
}
.recomment {
  display: flex;
  align-items: center;
  padding: 7px 30px 7px 40px;
  border-left: 2px solid rgb(185, 185, 185);
  margin: 0 0 0 70px;
}
</style>