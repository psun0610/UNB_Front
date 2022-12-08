<template>
  <div class="container2">
    <div class="badge-edit-wrap">
      <!-- 현재 뱃지 -->
      <img src="" class="current-badge my-shadow" @click="isFolding()">
      <button class="edit-btn no-kg-font my-shadow">프로필 편집</button>
    </div>
    <!-- 뱃지컬렉션 -->
    <div class="badge-collection my-shadow" v-if="isOpen">
    </div>
    <!-- 이름과 활동지수 -->
    <div class="profile-container">
      <div class="name-exp-wrap">
        <h2>{{ userinfo.nickname }}</h2>
        <p>총 활동지수 {{ user.all_score }}</p>
      </div>
      <div class="exp-bar">
        <div class="current-exp"></div>
      </div>
    </div>

    <div class="article-comment-container">
      <input type="radio" name="artcom" id="article" v-model="picked" value="article" style="display: none" checked>
      <label class="profile-radio" for="article">{{ userinfo.nickname }}님이 작성한 글</label>

      <input type="radio" name="artcom" id="comment" v-model="picked" value="comment" style="display: none">
      <label class="profile-radio" for="comment">{{ userinfo.nickname }}님이 작성한 댓글</label>
    </div>
    <div class="arttable">
      <div v-if="(picked=='article')">
        <h4 v-if="articlelist.length==0" style="margin-top: 40px;">작성한 글이 없어요</h4>
        <div v-else v-for="(article, index) in articlelist.slice().reverse()" :key="index" class="artlist my-shadow">
          <router-link :to="'/Detail/' + article.pk" class="article-router">
            <div class="article">
              <h2 class="kg-font" style="margin: 0; font-size: 22px;">{{ article.title }}</h2>
              <div class="article-wrap">
                <div>{{ article.A }}</div>
                <h3 class="kg-font" style="font-size: 20px; margin: 0 10px;"><span style="color: var(--mypink)">V</span><span style="color: var(--myblue)">S</span></h3>
                <div>{{ article.B }}</div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="comtable">
      <div v-if="(picked=='comment')">
        <h4 v-if="comlist.length==0" style="margin-top: 40px;">작성한 댓글이 없어요</h4>
        <div v-else v-for="(com, index) in comlist.slice().reverse()" :key="index" class="comlist">
          <router-link :to="'/Detail/' + com.article_pk" class="article-router">
            <div class="article artlist my-shadow">
              <h3 class="kg-font" style="font-size: 22px; margin: 0 10px;">둘 중 더 킹받는 것은?</h3>
              <!-- <h3 class="kg-font" style="font-size: 20px; margin: 0 10px;">{{ article.article.title }}</h3> -->
              <p style="margin: 0; font-size: 16px;">> {{ com.content }}</p>
            </div>
          </router-link>
        </div>
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
      user: '',
      userinfo: '',
      articlelist: [],
      comlist: [],
      isOpen: false,
      picked: 'article',
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
      console.log(response.data.comment)
      this.user = response.data
      this.userinfo = response.data.userinfo
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
#article+label:hover, #comment+label:hover {
  background-color:#c4c4c4;
  scale: 1.05;
  transition: all .05s ease-in;
}
#article:checked+label {
  background-color: #4BBEFF;
  scale: 1.05;
  transition: all .15s ease;
}
#comment:checked+label {
  background-color: #FF719B;
  scale: 1.05;
  transition: all .15s ease;
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
.article-wrap {
  display: grid;
  grid-template-columns: 4fr 1fr 4fr;
}
.article {
  padding: 20px;
  transition: all .1s ease-in;
}
.article:hover {
  transform: scale(1.07);
  transition: all .1s ease-in;
}
</style>