<template>
  <div v-show="articles.length">
    <TodayKing></TodayKing>
    <h2 class="kg-font">토론 리스트</h2>
    <div v-for="(article, index) in articles" :key="index" class="list">
      <router-link :to="'/Detail/' + article.pk">
        <div class="box my-shadow">
          <h1 class="article-title kg-font">{{ article.title }}</h1>
          <div class="table-row">
            <div class="article-choice">
              <h3>{{ article.A }}</h3>
            </div>

            <div class="vs kg-font"><span style="color: var(--mypink)">V</span><span
                style="color: var(--myblue)">S</span></div>

            <div class="article-choice">
              <h3>{{ article.B }}</h3>
            </div>
          </div>

          <!-- exp 바 -->
          <div class="exp-wrap" v-if="(article.ABcount.A_percent || article.ABcount.B_percent)">
            <div class="exp" :style="`width:${article.ABcount.A_percent}%`" style="background-color: var(--mypink);">
              <p v-if="article.ABcount.A_percent!=0"> {{ article.ABcount.A_pick }} ({{ article.ABcount.A_percent }}%)</p>
            </div>
            <div class="exp" :style="`width:${article.ABcount.B_percent}%`" style="background-color: var(--myblue);">
              <p v-if="article.ABcount.B_percent!=0"> {{ article.ABcount.B_pick }} ({{ article.ABcount.B_percent }}%)</p>
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
    <a href="#" class="top-btn" v-show="(scroll_height > 800)">
      <div class="my-shadow">top▲</div>
    </a>
    <!-- <router-view :el="el"></router-view> -->
  </div>
</template>
<script>
const url = 'https://www.unbback.cf/articles/'
import { csrftoken } from '../csrf/csrf_token'
import TodayKing from '../components/TodayKing'
import axios from 'axios'
import * as _ from 'lodash'
export default {
  components: {
    TodayKing
  },
  data() {
    return {
      articles: [],
      comments: [],
      page: 1,
      hasNext: true,
      scroll_height: ''
    }
  },
  setup() { },
  created() { },
  mounted() {
    this.getPosts()
    var throttler
    window.onscroll = () => {
      if (!throttler) {
        throttler = setTimeout(() => {
          throttler = null
          this.scroll_height = window.scrollY || document.documentElement.scrollTop;
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            if (this.hasNext) {
              this.page += 1
              this.getPosts()
            }
          }
        }, 500)
      }

    }

  },
  unmounted() { },
  methods: {
    getPosts() {
      axios.get(url + '?page=' + this.page)
        .then(response => {
          this.hasNext = false
          if (response.data.next) {
            this.hasNext = true
          }
          for (let i = 0; i < response.data.results.length; i++) {
            this.articles.push(response.data.results[i])
          }
        })
        .catch(error => {
        })
    }
  }
}



</script>
<style scoped>
.table-row {
  max-width: 800px;
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
  width: 100%;
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

.exp-wrap {
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
  width: 100%;
  font-size: 16px;
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
@media (max-width: 650px) {
  .article-choice>h3 {
    font-size: 17px;
  }
  .article-title {
    font-size: 20px;
  }
  .top-btn>div {
    width: 50px;
    height: 50px;
  }
  .exp>p {
    font-size: 14px;
    min-width: 80px;
  }
}
</style>