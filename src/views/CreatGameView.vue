<template>
  <div class="create-div my-shadow">
    <h2 class="kg-font" style="margin:0 0 30px 0;">토론 주제를 직접 만들어보세요</h2>
    <form @submit.prevent="insertArticle">
      <input type="text" v-model="title" placeholder="제목을 입력하세요" class="title-input my-shadow">
      <div class="input-wrap" style="max-width:700px;">
        <textarea
        placeholder="A"
        v-model="A"
        class="A no-kg-font my-shadow"
        />
        <div class="vs kg-font">
          VS
        </div>
        <textarea
        placeholder="B"
        v-model="B"
        class="B no-kg-font my-shadow"
        />
      </div>
      <div>
        <button class="create-btn my-shadow">제출하기</button>
      </div>
    </form>
    <div v-if="error" role="alert">
      <p><strong>{{ error }}</strong></p>
    </div>
  </div>
</template>
<script>
const url = 'https://www.unbback.cf/articles/'
import {csrftoken} from '../csrf/csrf_token';
import axios from '../axios/index'
export default {
  components: {},
  data () {
    return {
      title: null,
      A: null,
      B: null,
      error: null,
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {
    insertArticle() {
      if(!this.title || !this.A || !this.B) {
        this.error = "선택지를 모두 채워주세요"
      } else {
        // console.log(this.title, this.A, this.B)
        axios.post(url, {title: this.title, A: this.A, B: this.B})
      .then(() => {
        this.$router.push({
          name: 'all-list'
        })
      })
      .catch(error => console.log(error))
      }
    }
  }
}
</script>
<style scoped>
.create-div {
  max-width: 850px;
  margin: 25vmin auto;
  padding: 80px 15px;
}
.create-btn {
  width: 100%;
  background-color: rgb(111, 214, 255);
  border: 0;
  padding: 7px 0;
  margin-top: 50px;
  border-radius:  3px;
  font-family: 'Pretendard-Regular';
  font-size: 15px;
  transition: 0.14s all ease-in;
}
.create-btn:hover {
  background-color: #4BBEFF;
  font-family: 'Pretendard-Regular';
  color: white;
  transition: 0.14s all ease-in;
}
form {
  display: flex;
  flex-direction: column;
  max-width: 700px;
  margin: 0 auto;
}
.title-input {
  text-align: center;
  padding: 10px;
  margin-bottom: 30px;
  border: 5px solid rgb(192, 192, 192);
  border-radius: 3px;
  font-weight: bold;
  font-size: 16px;
}
textarea {
  width: 280px;
  height: 60px;
  padding: 10px;
  border-radius: 3px;
  text-align: center;
  font-size: 16px;
}
.A {
  border: 5px solid #4BBEFF;
}
.B {
  border: 5px solid #FF719B;
}
textarea:focus, .title-input:focus {
  outline: none;
}
.input-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.vs {
  font-weight: bold;
  font-size: 20px;
  margin: 0 5px;
}
</style>