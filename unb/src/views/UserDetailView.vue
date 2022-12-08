<template>
  <div class="container2">
    <div class="badge-edit-wrap">
      <!-- 현재 뱃지 -->
      <img src="../assets/브론즈.png" class="current-badge my-shadow" @click="isFolding()">
      <button class="edit-btn no-kg-font my-shadow">프로필 편집</button>
    </div>
    <!-- 뱃지컬렉션 -->
    <div class="badge-collection my-shadow" v-if="isOpen">
      <img src="../assets/브론즈.png" class="my-shadow">
      <img src="../assets/브론즈.png" class="my-shadow">
      <img src="../assets/브론즈.png" class="my-shadow">
      <img src="../assets/브론즈.png" class="my-shadow">
    </div>
    <!-- 이름과 활동지수 -->
    <div class="profile-container">
      <div class="name-exp-wrap">
        <h2>{{ userdetail.nickname }}</h2>
        <p>총 활동지수 100</p>
      </div>
      <div class="exp-bar">
        <div class="current-exp"></div>
      </div>
    </div>

    <div class="article-comment-container">
      <input type="radio" name="artcom" id="article" v-model="picked" value=0 style="display: none" checked>
      <label class="profile-radio" for="article">{{ userdetail.nickname }}님이 작성한 글</label>

      <input type="radio" name="artcom" id="comment" v-model="picked" value=1 style="display: none">
      <label class="profile-radio" for="comment">{{ userdetail.nickname }}님이 작성한 댓글</label>
    </div>
    <div class="arttable">

      <div v-for="(article, index) in articlelist.slice().reverse()" :key="index" class="artlist my-shadow">
        <div class="article">
          <p>제목: {{ article.title }}</p>
          <p>{{ article.A }}</p>
          <p>{{ article.B }}</p>
        </div>
      </div>
    </div>
    <div class="comtable">
      <div v-for="(com, index) in comlist.slice().reverse()" :key="index" class="comlist">
        <p>제목: {{ com.content }}</p>
      </div>
    </div>
    
  </div>
</template>
<script>
import axios from '../axios'
const url = 'http://localhost:8000/accounts/'
export default {
  data(){
    return {
      userdetail: [],
      articlelist: [],
      comlist: [],
      height: 0,
      isOpen: false,
      radioValues: '',
    }
  },
  mounted() {
    axios({
      method: 'GET',
      url: url + this.$route.params.pk + '/my_page/',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    })
    .then(response => {
      console.log(response.data.userinfo)
      this.userdetail = response.data.userinfo
      this.articlelist = response.data.userinfo.article
      this.comlist = response.data.comment
      console.log(11)
    })
    .catch(response => {
      console.log('에러')
    })
  },
  methods: {
    isFolding() {
      if (this.isOpen == true) {
        this.isOpen = false
      } else {
        this.isOpen = true
      }
    }
  }
}
</script>
<style scoped>
#article:checked+label {
  background-color: #4BBEFF;
}
#comment:checked+label {
  background-color: #FF719B;
}
.container2 {
  margin: 100px auto;
  width: 500px;
}
.badge-edit-wrap {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.current-badge {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  transition: all .05s ease-in;
}
.current-badge:hover {
  scale: 1.05;
  transition: all .05s ease-in;
}
.edit-btn {
  background-color: #D9D9D9;
  border-radius: 3px;
  border: 0;
  padding: 10px 18px;
  margin-bottom: 15px;
}
.edit-btn:hover {
  background-color: #c4c4c4;
  scale: 1.05;
  transition: all .05s ease-in;
}

.badge-collection {
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 90px));
  margin: 30px 0 0 0;
}
.badge-collection>img {
  display: inline-block;
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
}

/* 이름과 활동지수 */
.profile-container {
  margin-top: 30px;
}
.name-exp-wrap {
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
}
.name-exp-wrap>h2 {
  margin: 0;
}
.name-exp-wrap>p {
  margin: 0 8px;
  color: gray;
  font-size: 15px;
}
.exp-bar {
  height: 23px;
  background-color: rgb(57, 57, 57);
  border-radius: 20px;
}
.article-comment-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.profile-radio {
  margin: 0 10px;
  padding: 10px 18px;
  background-color:#D9D9D9;
  font-size: 15px;
  border-radius: 3px;
}
.artlist {
  margin-top: 30px;
}
.article {
  padding: 15px;
}

</style>