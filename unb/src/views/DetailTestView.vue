<template>
  <div class="detail-container">
    <h1 class="kg-font title">{{ article_title }}</h1>
    <div class="balance-wrap">
      <div class="balance-back my-shadow" style="background-color: #FF719B;" @click="">
        <div class="AB">{{article_A}}</div>
      </div>
      <div class="balance-back my-shadow" style="background-color: #4BBEFF; align-self: flex-end;">
        <div class="AB">{{article_B}}</div>
      </div>
      <!-- <h2 class="balance-title kg-font">{{ article_title }}</h2> -->
      <h1 class="vs kg-font">VS</h1>
    </div>

    <div>
      <button @click="previousbutton()">이전 질문</button>
      <button @click="nextbutton()">다음 질문</button>
    </div>
    <!-- 댓글 입력 -->
    <form action="" method="post"></form>
    <form @submit.prevent="submitForm" class="myform">
      <div class="input-wrap">
        <input type="text" id="comment" v-model="content" class="input-text"/>
        <label for="comment">&nbsp;<button type="submit" style="background-color:black; color:white;">작성</button></label>
      </div>
    </form>
    <!-- 댓글 출력 -->
    <div class="commentlist">
      <div v-for="(comment, index) in article_comment" :key="index" class="list">
        <div class="comment-div"> 
          <div style="width:20%;"><img src="https://m.smartcara.com/web/product/option_button/202105/79aa353bc0b08653dd24427feb73c60b.png" style="width:70%;"></div>
          <div style="width:80%;">
            <div style="display:flex;">
              <p>작성자:{{comment.pk}} {{ comment.user }}</p>
              <div><i class="fa-regular fa-heart" @click="like(comment.pk)"></i></div>
              <div> <button type="button" :class="`${comment.pk}`" @click="recommenttoggle(index)"> 답글 </button> </div>
            </div>
            <div>내용:  {{ comment.content }} </div>
          </div>
        </div>
    <!-- 대댓글 작성폼 -->
        <div v-show="show[index]">
          <form @submit.prevent="submitreForm(comment.pk)" class="myreform">
            <div class="input-wrap">
              <input type="text" id="recomment" v-model="content" class="input-text"/>
              <label for="recomment">&nbsp;<button type="submit" style="background-color:black; color:white;">작성</button></label>
            </div>
          </form>
        </div>
      <!-- 대댓글 내용 -->
        <div v-for="(soncomment, index) in comment.soncomments" :key="index" class="list" style="display:flex; justify-content: flex-end;">
          <div class="recomment-div">
            <div style="width:20%;"><img src="https://m.smartcara.com/web/product/option_button/202105/79aa353bc0b08653dd24427feb73c60b.png" style="width:80%;"></div>
            <div>
              <div>작성자: {{ soncomment.user }} </div>
              <div>내용:  {{ soncomment.content }} </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const url = 'http://localhost:8000/articles/'
import loginStore from '../store/index'
import axios from '../axios/index'
export default {
  data(){
    return {
      article: null,
      article_A: null,
      article_B: null,
      article_title: null,
      article_comment: [],
      show:[],
      content: null,
      logincheck:'',
      random_index:'' // 아티클 인덱스
      }
  },
  mounted() {
    this.logincheck = loginStore.state.loginStore.isLogin // 로그인 체크
    axios({
      method: 'GET',
      url: url + this.$route.params.pk + '/'
    })
      .then(response => {
        this.article = response.data
        this.article_title = response.data.title
        this.article_A = response.data.A
        this.article_B = response.data.B
        this.article_comment = response.data.comments
        this.show = Array(this.article_comment.length).fill(false)
      })
      .catch(response => {
        alert('없는 글입니다.')
        history.go(-1)
      })
    axios.get('http://localhost:8000/articles/random/article/')
    .then((response) =>{
      this.random_index = response.data.article_pk
    })
  },
  methods: {
    Pick(badge) {
      const badge_pk = badge[1]
      axios({
        url : 'http://localhost:8000/accounts/'+this.$route.params.pk+'/my_page/',
        method : 'PUT',
        data : {
          test:'test',
          user_pk: this.user_pk,
          badge_pk: badge_pk,
        }
      })
      .then(response => {
        const badge_image  = response.data.image
        this.current_badge = require(`../assets${badge_image}`)
      }).catch(err => {
        console.error(err)
      })
    },
    submitForm() {
      axios.post(`http://localhost:8000/articles/${this.$route.params.pk}/comment/`, this.$data)
      .then((response) => {
        axios({ // 댓글 작성해서 리스트를 다시 불러옴
          method: 'GET',
          url: url + this.$route.params.pk + '/',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        })
          .then(response => {
            this.article = response.data
            this.article_A = response.data.A
            this.article_B = response.data.B
            this.article_comment = response.data.comments
            this.show = Array(this.article_comment.length).fill(false)
            this.content = null
          })
          .catch(response => {
          })
      })
      .catch((err) => {
      })
      },
    like(e){ // 좋아요
      if (this.logincheck){
      const comment_like_url = `http://localhost:8000/articles/${this.$route.params.pk}/comment/${e}/like/`
      testaxios.post(comment_like_url)
      .then((res) => {
        console.log(res)
      })
      } else {
        alert('로그인 후 가능합니다.')
      }
    },
    recommenttoggle(index) {
      this.show.splice(index,1,!this.show[index])
    },
    submitreForm(pk) {
      axios.post(`http://localhost:8000/articles/${this.$route.params.pk}/comment/${pk}/recomment/`, this.$data)
      .then((response) => {
        axios({ // 댓글 작성해서 리스트를 다시 불러옴
          method: 'GET',
          url: url + this.$route.params.pk + '/',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        })
          .then(response => {
            this.article = response.data
            this.article_A = response.data.A
            this.article_B = response.data.B
            this.article_comment = response.data.comments
            this.show = Array(this.article_comment.length).fill(false)
            this.content = null
          })
          .catch(response => {
            console.log('에러')
          })
      })
      .catch((err) => {
        console.log('댓글 작성 실패')
      })
    },
    previousbutton() {
      history.go(-1)
    },
    nextbutton() {
      const idx = this.random_index
      window.location.href = 'http://localhost:8080/Detail/'+ idx
    }
  }
}
</script>
<style scoped>
.title {
  height: 23px;
  display: inline-block;
  padding: 0px 30px;
  border-bottom: 25px solid rgb(224, 224, 224);
  margin-bottom: 50px;
}
.detail-container {
  margin-top: 90px;
}
.balance-wrap {
  display: flex;
  position: relative;
  height: 410px;
  margin-bottom: 50px;
}
.balance-back {
  width: 50%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 60px;
  box-sizing: border-box;
}
.vs {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-size: 60px;
  color: white;
}
.balance-title {
  position: absolute;
  color: white;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-size: 30px;
}
.AB {
  font-size: 20px;
  font-weight: bold;
}

article {
  width: 50%;
}
.comment-div {
  height: 130px;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  display: flex;
}
</style>
