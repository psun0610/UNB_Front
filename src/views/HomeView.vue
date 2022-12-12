<template>
  <div class="home">
    <TodayKing></TodayKing>
    <!-- 밸런스 게임 바로가기 -->
    <a :href="'/Detail/'+random_index">
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

      <div class="today-dis-article-wrap">
        <img src="../assets/vs.png" class="vs">
        <article>
          <a :href="'/Detail/'+today_pk">
            <h1 class="article-title">{{article_A}}</h1>
          </a>
          <a :href="'/Detail/'+today_pk">
            <div class="today-dis-comment-wrap">
              <img src="../assets/말풍선1.png">
              <div class="comments">
                <div class="best-comment">
                  <div style="background-color:#FF719B;">BEST</div>
                  <p class="best-p">{{this.best_A}}</p>
                </div>
                <p v-for="(item,index) in comments_A.slice(0,3)" :key="index">{{item}}</p>
              </div>
            </div>
          </a>
        </article>

        <article>
          <a :href="'/Detail/'+today_pk">
            <h1 class="article-title">{{article_B}}</h1>
          </a>
          <a :href="'/Detail/'+today_pk">
            <div class="today-dis-comment-wrap">
              <img src="../assets/말풍선2.png">
              <div class="comments">
                <div class="best-comment">
                  <div style="background-color:#4BBEFF;">BEST</div>
                  <p class="best-p">{{this.best_B}}</p>
                </div>
                <p v-for="(item,index) in comments_B.slice(0,3)" :key="index">{{item}}</p>
              </div>
            </div>
          </a>
        </article>
      </div>
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
  data () {
    return {
      sampleData: '',
      random_index: '',
      today_pk:'',
      article_A:'',
      article_B:'',
      comment:'',
      comments_A:[],
      comments_B:[],
      best_A:'',
      best_B:''
    }
  },
  setup () {},
  created () {},
  mounted () {
    axios.get(url + 'random/article/')
    .then((response) =>{
      this.random_index = response.data.article_pk
    })

    axios.get('https://www.unbback.cf/articles/today/article/') // 오늘의 토론 URL 넣을 자리
    .then((response) =>{
      this.today_pk = response.data.article_pk
      axios({ // 글 axios
      method: 'GET',
      url: `https://www.unbback.cf/articles/${this.today_pk}/`
      })
      .then(response => {
        this.article_A = response.data.A
        this.article_B = response.data.B
        this.comment = response.data.comments
        for (const obj of this.comment){
          if (obj.pick == 1) {
            this.comments_A.push(obj.content)
          } else if ( obj.pick == 2) {
            this.comments_B.push(obj.content)
          }
        }
        this.best_A = response.data.best_A.content
        this.best_B = response.data.best_B.content
      })
    })
  },
  unmounted () {},
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
</style>
