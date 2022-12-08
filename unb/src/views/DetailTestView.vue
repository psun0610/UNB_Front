<template>
  <div>
    <div class="balance-wrap my-shadow">
      <div class="balance-back" style="background-color: #FF719B;"></div>
      <div class="balance-back" style="background-color: #4BBEFF"></div>
      <div class="AandB">
        <div class="ABbox">{{article_A}}</div>
        <h1 class="balance-title b-title kg-font">VS</h1>
        <div class="ABbox">{{article_B}}</div>
      </div>
    </div>
    <br><br><br>
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
import axios from '../axios'
import articles_pk_list from '../store/index'
import loginStore from '../store/index'
import testaxios from '../axios/index'
export default {
  data(){
    return {
      article: null,
      article_A: null,
      article_B: null,
      article_comment: [],
      show:[],
      content: null,
      randomlist:'',
      logincheck:''
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
        this.article_A = response.data.A
        this.article_B = response.data.B
        this.article_comment = response.data.comments
        this.show = Array(this.article_comment.length).fill(false)
      })
      .catch(response => {
        console.log('에러')
      })

  },
  methods: {
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
        alert('로그인해')
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
      const randomlist = articles_pk_list.state.articles_pk_list.pklist
      const idx = Math.floor(Math.random() * randomlist.length)
      window.location.href = 'http://localhost:8080/Detail/'+idx
    }
  }
}
</script>
<style scoped>
.balance-wrap {
  display: flex;
  position: relative;
}
.balance-back {
  width: 50%;
  height: 500px;
}
.balance-title {
  position: absolute;
  color: white;
  left: 50%;
  transform: translate(-50%, -50%);
}
.b-title {
  top: 39%;
  font-weight: 700;
  font-size: 50px;
}
.b-subtitle {
  top: 55%;
  font-weight: 300;
}
.today-dis {
  margin: 50px 0;
}
.today-dis-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.today-dis-title>h1 {
  font-size: 28px;
  margin: 0;
}
.today-dis-title>a {
  text-decoration: none;
  color: gray;
}
.today-dis-title p {
  margin: 0;
}
.today-dis-article-wrap {
  display: flex;
  position: relative;
}
.vs {
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
}
.article-title {
  /* width: 90%;
  margin: 0 auto; */
  font-size: 20px;
}
.today-dis-comment-wrap{
  display: flex;
  flex-direction: column;
  position: relative;
  height: 400px;
}
.today-dis-comment-wrap img {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  height: 400px;
  width: 80%;
}
.today-dis-comment-wrap>div>p {
  margin: 10px 0;
  text-align: start;
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap:break-word;
  line-height: 1.2em;
}
.best-p {
  margin: 10px 0;
  text-align: start;
  width: calc(250px - 50px);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap:break-word;
  line-height: 1.2em;
}
.best-comment {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
.best-comment div {
  color: white;
  border-radius: 5px;
  padding: 4px 8px;
  margin-right: 8px;
  font-family: 'Pretendard-Regular';
  font-size: 14px;
}
article {
  width: 50%;
}
.comments {
  position: absolute;
  z-index: 1;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.AandB {
  display: grid;
  grid-template-columns: 4fr 1fr 4fr;
  position: absolute;
}
.comment-div {
  height: 130px;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  display: flex;
}
.recomment-div {
  width: 90%;
  height : 130px;
  border-left: 1px solid black;
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
}
</style>
