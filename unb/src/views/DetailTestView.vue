<template>
  <div class="detail-container">

    <h1 class="kg-font title">{{ article_title }}</h1>
    <div class="balance-wrap">
      <div class="balance-back my-shadow" style="background-color: #FF719B;" @click="choice_A()">
        <div class="AB">{{ article_A }}</div>
      </div>
      <div class="balance-back my-shadow" style="background-color: #4BBEFF; align-self: flex-end;" @click="choice_B()">
        <div class="AB">{{ article_B }}</div>
      </div>
      <!-- <h2 class="balance-title kg-font">{{ article_title }}</h2> -->
      <h1 class="vs kg-font">VS</h1>
    </div>

    <div>
      <button @click="previousbutton()" class="button_2 kg-font" style="margin:0px">이전 질문</button>
      <button @click="nextbutton()" class="button_2 kg-font" style="margin:0px">다음 질문</button>
    </div>
    <!-- 댓글 입력 -->
    <form @submit.prevent="submitForm" class="myform" style="margin:2rem 0">
      <div style="display:flex">
        <input type="text" id="comment" v-model="content" class="input-text" />
        <button type="submit" class="w-btn w-btn-gra3 w-btn-gra-anim kg-font" v-bind:disabled="(Choice_AB == '')">
          작성</button>
      </div>
    </form>
    <!-- 댓글 출력 -->
    <div class="commentlist">
      <div v-for="(comment, index) in article_comment" :key="index" style="margin:2rem 0">
        <div class="comment-div">
          <a :href="purl + `${comment.userpk}` + '/'" style="position:relative">
            <div style="display: flex;justify-content: center;align-content: center;">
              <img :src="`${comment.userbadge.image}`" style="width:70%;">
            </div>
            <p style='margin:0;position: absolute; bottom: 7px; left:48.1%' class="kg-font">{{ comment.user }}</p>
          </a>
          <div style="width:80%;">
            <div style="display:flex; justify-content: end; margin:0.5rem">
              <div style="margin-right:0.4rem"> <button type="button"
                  :class="`${comment.pk}` + ' w-btn-neon2' + ' kg-font'" @click="recommenttoggle(index)"> 답글 </button>
              </div>
              <div style="margin-top:0.2rem"><i class="fa-regular fa-heart" @click="like(comment.pk)"></i></div>
            </div>
            <p style="text-align: start; margin-top:0px " class="kg-font">{{ comment.content }} </p>
          </div>
        </div>
        <!-- 대댓글 작성폼 -->
        <div v-show="show[index]">
          <form @submit.prevent="submitreForm(comment.pk)" class="myreform">
            <div class="input-wrap" style="">
              <input type="text" id="recomment" v-model="content" class="input-text" />
              <label for="recomment">&nbsp;<button type="submit"
                  style="background-color:black; color:white;">작성</button></label>
            </div>
          </form>
        </div>
        <!-- 대댓글 내용 -->
        <div v-for="(soncomment, index) in comment.soncomments" :key="index" class="list"
          style="display:flex; justify-content: start;margin-left: 5rem;">
          <div style="display:flex;">
            <div style="width:100px;position:relative;margin-bottom:10px;margin-right:0px">
              <a :href="purl + `${soncomment.userpk}` + '/'">
                <img :src="`${soncomment.userbadge.image}`" style="width:80%;">
                <div class="kg-font" style='position: absolute;bottom: -10px; left:46.1%'>{{
                    soncomment.user
                }}
                </div>
              </a>
            </div>
            <div>
              <p class="kg-font">{{ soncomment.content }} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginStore from '../store/index'
import axios from '../axios/index'
const url = 'http://localhost:8000/articles/'
export default {
  data() {
    return {
      article: null,
      article_A: null,
      article_B: null,
      article_title: null,
      article_comment: [],
      show: [],
      content: null,
      logincheck: '',
      random_index: '', // 아티클 인덱스
      Choice_AB: '',
      purl: 'http://localhost:8080/userprofile/'
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
      .then((response) => {
        this.random_index = response.data.article_pk
      })
  },
  methods: {
    Pick(badge) {
      const badge_pk = badge[1]
      axios({
        url: 'http://localhost:8000/accounts/' + this.$route.params.pk + '/my_page/',
        method: 'PUT',
        data: {
          test: 'test',
          user_pk: this.user_pk,
          badge_pk: badge_pk
        }
      })
        .then(response => {
          const badge_image = response.data.image
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
    like(e) { // 좋아요
      if (this.logincheck) {
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
      this.show.splice(index, 1, !this.show[index])
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
      window.location.href = 'http://localhost:8080/Detail/' + idx
    },
    choice_A() {
      this.Choice_AB = 'A'

    },
    choice_B() {
      this.Choice_AB = 'B'
      console.log('B')
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

.list {
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  margin-top: 2rem
}

.w-btn-neon2 {
  position: relative;
  border: none;
  min-width: 100px;
  min-height: 40px;
  background: linear-gradient(90deg,
      rgba(129, 230, 217, 1) 0%,
      rgba(79, 209, 197, 1) 100%);
  border-radius: 1000px;
  color: darkslategray;
  cursor: pointer;
  box-shadow: 12px 12px 24px rgba(79, 209, 197, 0.64);
  font-weight: 700;
  transition: 0.3s;
}

.w-btn-neon2:hover {
  transform: scale(1.2);
}

.input-text {

  width: 85%;
  height: 2.8rem;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
  margin-right: 1rem
}

.w-btn {
  width: 6rem;
  height: 2.8rem;
  position: relative;
  border: none;
  display: inline-block;
  padding: 15px 30px;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
}

.w-btn:hover {
  letter-spacing: 2px;
  transform: scale(1.2);
  cursor: pointer;
}

.w-btn-gra3 {
  background: linear-gradient(45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000);
  color: white;
}

.w-btn-gra-anim {
  background-size: 400% 400%;
  animation: gradient1 5s ease infinite;
}

@keyframes gradient1 {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.button_2 {
  border: 0;
  outline: none;
  font-size: 20px;
  margin: 0px 30px;
  background: black;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
}

.button_2:hover {
  color: white;
  background: orange;
}
</style>
