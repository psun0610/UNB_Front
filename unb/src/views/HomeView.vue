<template>
  <div class="home">
    <!-- 오늘의 토론왕 -->
    <div class="today-king my-shadow">
      <div class="today-king-title">
        오늘의 토론왕<img src="../assets/crown.png" style="width: 50px;">
      </div>
      <div></div>
    </div>

    <!-- 밸런스 게임 바로가기 -->
    <a href="">
      <div class="balance-wrap my-shadow">
        <div class="balance-back" style="background-color: #FF719B;"></div>
        <div class="balance-back" style="background-color: #4BBEFF"></div>
        <h1 class="balance-title b-title kg-font">밸런스 게임</h1>
        <h2 class="balance-title b-subtitle">시작하기 ></h2>
      </div>
    </a>

    <!-- 오늘의 토론 -->
    <div class="today-dis">
      <div class="today-dis-title">
        <h1 class="kg-font">오늘의 토론</h1>
        <a href="">
          <p>목록보기</p>
        </a>
      </div>
      <hr style="border: solid 1px #D9D9D9">

      <div class="today-dis-article-wrap">
        <img src="../assets/vs.png" class="vs">
        <article>
          <a href="">
            <h1 class="article-title">술 먹고 다음날 일어났더니 전 애인한테 부재중 발신 21건</h1>
          </a>
          <a href="">
            <div class="today-dis-comment-wrap">
              <img src="../assets/말풍선1.png">
              <div class="comments">
                <div class="best-comment">
                  <div style="background-color:#FF719B;">BEST</div>
                  <p class="best-p">베스트 댓글 테스트</p>
                </div>
                <p>테스트 댓글 테스트 댓글 테스트 댓글 테스트 댓글 테스트 댓글 테스트 댓글 테스트 댓글 테스트 댓글 테스트 댓글 테스트 댓글 테스트 댓글 테스트 댓글 테스트 댓글 테스트 댓글 </p>
                <p>테스트 댓글</p>
                <p>테스트 댓글</p>
              </div>
            </div>
          </a>
        </article>

        <article>
          <a href="">
            <h1 class="article-title">술 먹고 다음날 일어났더니 전공교수님과 통화 내역 1건</h1>
          </a>
          <a href="">
            <div class="today-dis-comment-wrap">
              <img src="../assets/말풍선2.png">
              <div class="comments">
                <div class="best-comment">
                  <div style="background-color:#4BBEFF;">BEST</div>
                  <p class="best-p">베스트 댓글 테스트</p>
                </div>
                <p>테스트 댓글</p>
                <p>테스트 댓글</p>
                <p>테스트 댓글</p>
              </div>
            </div>
          </a>
        </article>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      sampleData: ''
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {}
}
</script>
<style scoped>
.today-king {
  max-width: 100%;
  height: 50px;
  margin: 120px 0 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 5px solid #4BBEFF;
  border-left: 5px solid #4BBEFF;
  border-bottom: 5px solid #FF719B;
  border-right: 5px solid #FF719B;
  padding: 0 70px;
  font-weight: bold;
}
.today-king-title {
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 17px;
}
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
</style>
