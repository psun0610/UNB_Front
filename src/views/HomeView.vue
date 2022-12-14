<template>
  <div class="home" v-show="today_pk">
    <TodayKing></TodayKing>
    <!-- 밸런스 게임 바로가기 -->
    <router-link to="/about">
      <p style="text-align: start;">❓언발란스에 대해 알아보기></p>
    </router-link>
    <a :href="'/Detail/' + random_index">
      <div class="balance-wrap">
        <div class="balance-back my-shadow" style="background-color: #FF719B;"></div>
        <div class="balance-back my-shadow" style="background-color: #4BBEFF; align-self: flex-end;"></div>
        <h1 class="balance-title b-title kg-font">밸런스 게임</h1>
        <h2 class="balance-title b-subtitle">시작하기 ></h2>
      </div>
    </a>

    <!-- 오늘의 토론 -->
    <div class="today-dis">
      <div class="today-dis-title">
        <h1 class="kg-font">오늘의 토론</h1>
        <router-link to="/all-list/">
          <p>목록보기</p>
        </router-link>
      </div>
      <hr style="border: solid 1px #D9D9D9">

      <a :href="'/Detail/' + today_pk">
        <h1 class="kg-font article-title" v-show="article_title">{{ article_title }}고르세요</h1>
      </a>
      <a :href="'/Detail/' + today_pk">
        <article>
          <h2 class="no-kg-font">{{ article_A }}</h2>
          <div class="comment-box-A my-shadow">
            <!-- 댓글들 -->
            <div v-if="comments_A.length" class="comment-wrap">
              <!-- A 베스트 댓글 -->
              <div class="best-comment my-shadow">
                <div class="best-badge" style="background-color: var(--mypink);">BEST</div>
                {{ this.best_A }}
              </div>
              <!-- 일반 댓글 3개 -->
              <p v-for="(item, index) in comments_A.slice(0, 3)" :key="index" class="my-shadow">{{ item }}</p>
            </div>
            <!-- 댓글이 없다면 -->
            <div v-else style="font-size: 16px;">
              댓글이 없어요 ㅠㅠ
            </div>
          </div>
        </article>
      </a>
      <h1 class="kg-font" style="font-size: 35px; margin: 10px 0;">
        <span style="color: var(--mypink);">V</span>
        <span style="color: var(--myblue);">S</span>
      </h1>

      <a :href="'/Detail/' + today_pk">
        <article>
          <h2 class="no-kg-font">{{ article_B }}</h2>
          <div class="comment-box-B my-shadow">
            <!-- 댓글들 -->
            <div v-if="comments_B.length" class="comment-wrap">
              <!-- B 베스트 댓글 -->
              <div class="best-comment my-shadow">
                <div class="best-badge" style="background-color: var(--myblue);">BEST</div>
                {{ this.best_B }}
              </div>
              <!-- 일반 댓글 3개 -->
              <p v-for="(item, index) in comments_B.slice(0, 3)" :key="index" class="my-shadow">{{ item }}</p>
            </div>
            <!-- 댓글이 없다면 -->
            <div v-else style="font-size: 16px;">
              댓글이 없어요 ㅠㅠ
            </div>
          </div>
        </article>
      </a>

    </div>
  </div>
</template>
<script>
const url = 'https://www.unbback.cf/articles/'
import TodayKing from '../components/TodayKing'
import axios from '../axios/index'
export default {
  components: {
    TodayKing
  },
  data() {
    return {
      sampleData: '',
      random_index: '',
      today_pk: '',
      article_title: '',
      article_A: '',
      article_B: '',
      comment: '',
      comments_A: [],
      comments_B: [],
      best_A: '',
      best_B: ''
    }
  },
  setup() { },
  created() { },
  mounted() {
    axios.get(url + 'random/article/')
      .then((response) => {
        this.random_index = response.data.article_pk
      })

    axios.get('https://www.unbback.cf/articles/today/article/') // 오늘의 토론 URL 넣을 자리
      .then((response) => {
        this.today_pk = response.data.article_pk
        axios({ // 글 axios
          method: 'GET',
          url: `https://www.unbback.cf/articles/${this.today_pk}/`
        })
          .then(response => {
            this.article_title = response.data.title
            this.article_A = response.data.A
            this.article_B = response.data.B
            this.comment = response.data.comments
            for (const obj of this.comment) {
              if (obj.pick == 1) {
                this.comments_A.push(obj.content)
              } else if (obj.pick == 2) {
                this.comments_B.push(obj.content)
              }
            }
            this.best_A = response.data.best_A.content
            this.best_B = response.data.best_B.content
          })
      })
  },
  unmounted() { },
  methods: {
  }
}
</script>
<style scoped>
.balance-wrap {
  display: flex;
  position: relative;
  height: 460px;
  margin-bottom: 50px;
}

.balance-back {
  width: 50%;
  height: 450px;
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
  font-size: 20px;
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
.article-title {
  display: inline-block;
  margin: 20px auto 10px;
  height: 23px;
  display: inline-block;
  padding: 0px 30px;
  border-bottom: 25px solid rgb(224, 224, 224);
}
article>h2 {
  font-size: 22px;
}
.comment-box-A {
  border: 5px solid var(--mypink);
  padding: 20px;
}
.comment-box-B {
  border: 5px solid var(--myblue);
  padding: 20px;
}
.best-comment {
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  margin: 10px 0;
  padding: 7px 10px;
  border-radius: 3px;
  text-align: start;
}
.best-badge {
  align-self: start;
  color: white;
  padding: 2px 7px;
  border-radius: 3px;
  font-size: 14px;
  margin-right: 10px;
}
.comment-box-A p, .comment-box-B p {
  margin: 10px 0;
  text-align: start;
  padding: 7px 10px 7px 13px;
  border-radius: 3px;
}
.comment-wrap {
  max-width: 350px;
  margin: 0 auto;
}
@media (max-width: 750px) {
  .balance-wrap {
  display: flex;
  position: relative;
  height: 360px;
  margin-bottom: 50px;
  }

  .balance-back {
    width: 50%;
    height: 350px;
  }

  .title {
    font-size: 27px;
    height: 15px;
    padding: 0px 30px;
    border-bottom: 25px solid rgb(224, 224, 224);
    margin-bottom: 50px;
  }

  .b-title {
    font-size: 40px;
  }

  .b-subtitle {
    font-size: 18px;
  }
}

@media (max-width: 550px) {
  .balance-wrap {
    height: 310px;
  }
  .balance-back {
    height: 300px;
  }
  .b-title {
    font-size: 35px;
  }

  .b-subtitle {
    font-size: 16px;
  }
  .article-title {
    font-size: 22px;
  }
  article>h2 {
  font-size: 18px;
}
}
</style>
