<template>
  <div class="detail-container">

    <h1 v-if="article_title" class="kg-font title">{{ article_title }}</h1>
    <h1 v-else class="kg-font title">둘 중 하나를 고르세요</h1>
    <div class="balance-wrap">
      <div :class="{'after-pick-wrap': pick_result}" style="z-index: 100;"></div>
      <div class="after-pick-next-wrap" v-if="pick_result!=null" @click="nextbutton()">
        <img src="../assets/arrow.png" class="kg-font next-button" style="width: 150px;">
        <div>다음 질문</div>
      </div>
      <!-- A 선택지 -->
      <div
        class="balance-back my-shadow a"
        style="background-color: var(--mypink); cursor: pointer"
        @click="choice_A()"
      >
        <div
          v-if="pick_result!=null"
          class="black-back"
        ></div>
        <div
          v-if="pick_result!=null"
          class="after-pick"
          :style="`height:${pick_result.A_percent}%; background-color:var(--mypink)`"
        >
          <h1 v-if="pick_result!=null" class="kg-font result_percent">{{pick_result.A_percent}}%</h1>
        </div>
        <div class="AB">{{article_A}}</div>
      </div>

      <!-- B 선택지 -->
      <div
        class="balance-back my-shadow b"
        style="background-color: var(--myblue); align-self: flex-end; cursor:pointer;"
        @click="choice_B()"
      >
        <div
          v-if="pick_result!=null"
          class="black-back"
        ></div>
        <div
          v-if="pick_result!=null"
          class="after-pick"
          :style="`height:${pick_result.B_percent}%;`"
          style="background-color:var(--myblue)"
        >
          <h1 v-if="pick_result!=null" class="kg-font result_percent">{{pick_result.B_percent}}%</h1>
        </div>
        <div class="AB">{{article_B}}</div>
      </div>
      <!-- <h2 class="balance-title kg-font">{{ article_title }}</h2> -->
      <h1 class="vs kg-font" :class="{'none': pick_result}">VS</h1>
    </div>

    <div style="margin-bottom: 70px;">
      <button @click="previousbutton()" class="prev-next-btn prev-btn my-shadow no-kg-font">이전 질문</button>
      <button @click="nextbutton()" class="prev-next-btn next-btn my-shadow no-kg-font">다음 질문</button>
    </div>
    <!-- 댓글 작성 -->
    <form v-show="Choice_AB" @submit.prevent="submitForm" class="myform">
      <div class="input-wrap">
        <input type="text" id="comment" v-model="content" class="my-shadow" autocomplete="off"/>
        <button type="submit" class="my-shadow no-kg-font" v-bind:disabled="(Choice_AB == '')">작성</button>
      </div>
    </form>
    <!-- 댓글 출력 -->
    <div>
      <!-- <BestCommentVue
      :comment="best_A"
      :pick=1
      ></BestCommentVue> -->
      <!-- <BestCommentVue
      :comment="best_B"
      :pick=2
      ></BestCommentVue> -->
      <div v-for="(comment, index) in article_comment" :key="index" style="margin:2rem 0">
        <!-- A B 픽마다 색깔 바꾸기 -->
        <div class="comment-div" :class="{'a_shadow': comment.pick == 1, 'b_shadow': comment.pick == 2}">
          <!-- 댓글 작성자 프로필 -->
          <a :href="purl + `${comment.userpk}` + '/'">
            <img :src="`${comment.userbadge.image}`" class="my-shadow comment-profile-img">
          </a>
          <!-- 댓글 -->
          <div class="comment">
            <div class="comment-profile">
              <p class="comment-name">{{ comment.user }}</p>
              <i class="fa-regular fa-heart heart" style="color: rgb(255 0 89);" v-show="!comment.like_users.includes(this.user_pk)" @click="like(comment.pk)"></i>
              <i class="fa-solid fa-heart heart" style="color: rgb(255 0 89);" v-show="comment.like_users.includes(this.user_pk)" @click="like(comment.pk)"></i>
              <button type="button" class="my-shadow no-kg-font" :class="`${comment.pk}`" @click="recommenttoggle(index)">답글</button>
            </div>
            <div class="comment-content">{{ comment.content }} </div>
          </div>
        </div>
        <!-- 대댓글 작성폼 -->
        <div v-show="show[index]">
          <form @submit.prevent="submitreForm(comment.pk)" class="myreform">
            <div class="input-wrap">
              <input type="text" id="recomment" style="margin-left:50px;" v-model="recontent" class="my-shadow" autocomplete="off"/>
              <button type="submit" class="my-shadow no-kg-font">작성</button>
            </div>
          </form>
        </div>
        <!-- 대댓글 내용 -->
        <div v-for="(soncomment, index) in comment.soncomments" :key="index" class="recomment">
          <a :href="purl + `${soncomment.userpk}` + '/'">
            <img :src="`${soncomment.userbadge.image}`" class="my-shadow comment-profile-img">
          </a>
          <div class="comment">
            <p class="comment-name" style="margin-bottom: 8px;">{{ soncomment.user }}</p>
            <div class="comment-content">{{ soncomment.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const url = 'https://www.unbback.cf/articles/'
import loginStore from '../store/index'
import axios from '../axios/index'
import axios2 from 'axios'
import BestCommentVue from '@/components/BestComment.vue'
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
      recontent: null,
      logincheck:'',
      random_index:'', // 아티클 인덱스
      comments: [],
      Choice_AB: '',
      user_pk : '',
      purl: 'https://www.unbalace.cf/userprofile/',
      pick_result: null,
      best_A: {},
      best_B: {},
      }
  },
  components: {
    BestCommentVue
  },
  mounted() {
    this.logincheck = loginStore.state.loginStore.isLogin // 로그인 체크
    if (this.logincheck) {
      this.user_pk = loginStore.state.loginStore.userInfo.pk // 로그인 체크
    }
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
        this.comments = response.data.comments
        this.best_A = response.data.best_A
        this.best_B = response.data.best_B
      })
      .catch(response => {
          alert('없는 글입니다.')
          history.go(-1)
      })

    axios.get(url + 'random/article/')
    .then((response) =>{
      this.random_index = response.data.article_pk
    })

  },
  methods: {
    pick() {
      axios2({
        url : url + `${this.$route.params.pk}/`,
        method : 'POST',
        data : {
          user_pk: this.user_pk,
          badge_pk: badge_pk,
        }
      })
      .then(response => {
        
      }).catch(err => {
        console.error(err)
      })
    },
    submitForm() {
      if(this.logincheck) {
        axios.post(url + `${this.$route.params.pk}/comment/`, this.$data)
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
          console.error(err)
        })
      } else {
        alert('로그인 후 가능합니다.')
      }
    },
    like(e){ // 좋아요
      if (this.logincheck){
        const comment_like_url = url + `${this.$route.params.pk}/comment/${e}/like/`
        axios.post(comment_like_url)
        .then((res) => {
          console.log(res)
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
          })
      } else {
        alert('로그인 후 가능합니다.')
      }
    },
    recommenttoggle(index) {
      this.show.splice(index,1,!this.show[index])
    },
    submitreForm(pk) {
      if(this.logincheck) {
        axios.post(url + `${this.$route.params.pk}/comment/${pk}/recomment/`, this.$data)
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
              this.recontent = null
            })
            .catch(response => {
              console.log('에러')
            })
        })
        .catch((err) => {
          console.log('댓글 작성 실패')
        })
      } else {
        alert('로그인 후 가능합니다.')
      }
    },
    previousbutton() {
      history.go(-1)
    },
    nextbutton() {
      const idx = this.random_index
      window.location.href = 'https://www.unbalace.cf/Detail/'+ idx
    },
    choice_A() {
      this.Choice_AB = 'A'
      axios.post(url + `${this.$route.params.pk}/game_pick/`, {pick: 1})
      .then(response => {
        this.pick_result = response.data
      })
      .catch(error => console.log(error))
      },
    choice_B() {
      this.Choice_AB = 'B'
      axios.post(url + `${this.$route.params.pk}/game_pick/`, {pick: 2})
      .then(response => {
        this.pick_result = response.data
      })
      .catch(error => console.log(error))
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
  position: relative;
  width: 50%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 60px;
  box-sizing: border-box;
  transition: all .5s ease;
  overflow: hidden;
}
.a:hover {
  z-index: 1;
  scale: 1.02;
  transition: all .2s ease;
}
.b:hover {
  z-index: 1;
  scale: 1.02;
  transition: all .2s ease;
}

@keyframes fade-up {
  from {
    opacity: .5;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translate(0);
  }
}
.black-back {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.63);
}
.after-pick {
  animation: fade-up 1s ease-out;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.result_percent {
  margin: 0;
  color: white;
  font-weight: bold;
  font-size: 38px;
}
.after-pick-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.vs {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-size: 40px;
  color: white;
  z-index: 2;
}
.none {
  opacity: 0;
  transition: all .5s ease;
}
@keyframes button-appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.after-pick-next-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  opacity: 0;
  animation: button-appear .5s ease-in-out forwards;
  animation-delay: 1.5s;
  font-size: 18px;
  font-weight: bold;
  color: white;
  transition: all .1s ease-in-out;
}
.after-pick-next-wrap:hover {
  left: 51%;
  scale: 1.05;
  transition: all .1s ease-in-out;
}
.AB {
  font-size: 20px;
  font-weight: bold;
}
.prev-next-btn {
  margin: 0 10px;
  width: 100px;
  height: 30px;
  border: 0;
  border-radius: 3px;
  background-color:  #d9d9d9;
  transition: all .1s ease;
}
.prev-next-btn:hover {
  scale: 1.05;
  transition: all .1s ease;
}
.prev-btn:hover{
  background-color: var(--mypink);
}
.next-btn:hover {
  background-color: var(--myblue);
}
article {
  width: 50%;
}

/* 댓글 작성 */
.input-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.input-wrap>input {
  width: 90%;
  height: 33px;
  border-radius: 3px;
  border: 0;
  padding: 0 20px;
  font-size: 16px;
  text-align: center;
}
.input-wrap>button {
  width: 90px;
  height: 33px;
  margin-left: 15px;
  background-color:rgb(73, 73, 73);
  color:white;
  font-size: 16px;
  border: 0;
  border-radius: 3px;
}
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
