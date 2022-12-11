<template>
  <div>
    <TodayKing></TodayKing>
    <h2 class="kg-font">토론 리스트</h2>
    <div v-for="(article, index) in articles" :key="index" class="list">
      <router-link :to="'/Detail/' + article.pk">
        <div class="box my-shadow">
          <h1 class="article-title kg-font">{{ article.title }}</h1>
          <div class="table-row">
            <div class="article-choice">
              <h3>{{ article.A }}</h3>
              <div class="comments" v-if="comments.length">
                <div class="best-badge" style="background-color: var(--mypink);">BEST</div>
                {{ comments }}
              </div>
              <div class="no-comments" v-else>아직 댓글이 없어요 작성해주세요!</div>
            </div>

            <div class="vs kg-font"><span style="color: var(--mypink)">V</span><span style="color: var(--myblue)">S</span></div>

            <div class="article-choice">
              <h3>{{ article.B }}</h3>
              <div class="comments" v-if="comments.length">
                <div class="best-badge" style="background-color: var(--myblue);">BEST</div>
                {{ comments }}
              </div>
              <div class="no-comments" v-else>아직 댓글이 없어요 작성해주세요!</div>
            </div>
          </div>

          <!-- exp 바 -->
          <div class="exp-wrap" v-if="(article.ABcount.A_percent & article.ABcount.B_percent)">
            <div class="exp" :style="`width:${article.ABcount.A_percent}%`" style="background-color: var(--mypink);">
              <p>0 ({{ article.ABcount.A_percent }})</p>
            </div>
            <div class="exp" :style="`width:${article.ABcount.A_percent}%`" style="background-color: var(--myblue);">
              <p>0 ({{ article.ABcount.A_percent }})</p>
            </div>
          </div>

          <div class="exp-wrap" v-else>
            <div class="exp" :style="`width:50%`" style="background-color: var(--mypink);">
              <p>0 (50%)</p>
            </div>
            <div class="exp" :style="`width:50%`" style="background-color: var(--myblue);">
              <p>0 (50%)</p>
            </div>
          </div>

        </div>
      </router-link>
    </div>
    <a href="#" class="top-btn" v-show="(scroll_height>800)">
      <div class="my-shadow">top▲</div>
    </a>
    <!-- <router-view :el="el"></router-view> -->
  </div>
</template>
<script>
import {csrftoken} from '../csrf/csrf_token'
import TodayKing from '../components/TodayKing'
import axios from 'axios'
export default {
  components: {
    TodayKing
  },
  data () {
    return {
      articles: [],
      comments:[],
      page:1,
      hasNext: true,
      scroll_height: ''
    }
  },
  setup () {},
  created () {},
  mounted() {
    this.getPosts()
    window.onscroll = () => {
        this.scroll_height = window.scrollY || document.documentElement.scrollTop;
        console.log(this.scroll_height)
        if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          if (this.hasNext) {
            this.page += 1
            this.getPosts()
          }
        }
    }

  },
  unmounted() {},
  methods: {
    getPosts() {
      console.log('Get Posts')
      axios.get('http://localhost:8000/articles/?page=' + this.page)
        .then(response => {
            console.log(response.data)
            this.hasNext = false
            if (response.data.next) {
                this.hasNext = true
            }
            for (let i = 0; i < response.data.results.length; i++) {
                this.articles.push(response.data.results[i])
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}
}



</script>
<style scoped>
.table-row {
  width: 800px;
  margin: 10px auto 20px;
  display: grid;
  grid-template-columns: 4fr 1fr 4fr;
}
.box {
  margin: 30px 0;
  padding: 20px;
  padding-bottom: 35px;
  border-radius: 5px;
}

.article-title {
  font-size: 22px;
  margin: 0;
}
.article-choice {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
.article-choice>h3 {
  margin: 0;
  font-size: 20px;
  margin-bottom: 10px;
  width: 90%;
}
.vs {
  font-size: 30px;
  font-weight: bold;
}
.no-comments {
  color: gray;
}
.best-badge {
  display: inline-block;
  padding: 3px 10px;
  color: white;
  border-radius: 3px;
  font-size: 14px;
}
.exp-wrap{
  max-width: 800px;
  display: flex;
  margin: 0 auto;
}
.exp {
  position: relative;
  height: 8px;
}
.exp>p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
}
.top-btn {
  position: fixed;
  bottom: 100px;
  right: 10vw;
}
.top-btn>div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgb(163, 163, 163);
  color: white;
  font-weight: bold;
}
</style>