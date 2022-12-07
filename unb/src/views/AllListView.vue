<template>
  <div>
    <TodayKing></TodayKing>
    <h1> 토론리스트 </h1>
    <div>
      <div class="listWrapper">
        <div v-for="(article, index) in articles" :key="index" class="list">
          <router-link :to="'/Detail/' + article.pk">
            <div class="box">
              <div class="table-row">
                <div class="divA">{{ article.A }}</div>
                <div class="divVS">VS</div>
                <div class="divB">{{article.B}}</div>
              </div>
              <div>{{article.ABcount.A_percent}} {{article.ABcount.B_percent}} (A B 퍼센트) </div>
              <div class="test">
                <div class="A_bar" :style="`width:${article.ABcount.A_percent}%`" style="background-color:rgb(199, 92, 167)">AAAAA</div>
                <div class="B_bar" :style="`width:${article.ABcount.B_percent}%`" style="background-color:rgb(18, 151, 213);">BBBBB</div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <!-- <router-view :el="el"></router-view> -->
    </div>
  </div>
</template>
<script>
import {csrftoken} from '../csrf/csrf_token'
import TodayKing from '../components/TodayKing'
import testaxios from '../axios/index'
const url = 'http://localhost:8000/articles/'
export default {
  components: {
    TodayKing
  },
  data () {
    return {
      articles: [],
      comments:[]
    }
  },
  setup () {},
  created () {},
  mounted() {
    testaxios ({
      method: 'GET',
      url: url,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    })
      .then(response => {
        this.articles = response.data
        console.log(response.data)
      })
      .catch(response => {
        console.log('access토큰 만료')
        console.log(response.response.data)
      })
    testaxios ({
      method: 'GET',
      url: url,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    })
      .then(response => {
        this.articles = response.data
        console.log(response.data)
      })
      .catch(response => {
        console.log('access토큰 만료')
        console.log(response.response.data)
      })
  },
  unmounted() {},
  methods: {}
}

</script>
<style scoped>
.table-row {
  height: 50%;
  display: grid;
  grid-template-columns: 4fr 1fr 4fr;
}
.box {
  border: 1px solid black;
  height: 150px;
}
.test{
  display: flex;
}
</style>