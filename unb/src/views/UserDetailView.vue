<template>
  <div>
    <br>
    <div> 유저 이름 <br><br> {{userdetail.nickname}} </div>
    <br><br><br>
    <div> 유저가 쓴 글 </div>
    <br>
    <div class="arttable">
      <div v-for="(article, index) in articlelist.slice().reverse()" :key="index" class="artlist">
        <p>제목: {{ article.title }}</p>
      </div>
    </div>
    <br><br><br>
    <div> 유저가 쓴 댓글 </div>
    <div class="comtable">
      <div v-for="(com, index) in comlist.slice().reverse()" :key="index" class="comlist">
        <p>제목: {{ com.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
const url = 'http://localhost:8000/accounts/'
import axios from '../axios'
export default {
  data(){
    return {
      userdetail: [],
      articlelist: [],
      comlist: []
    }
  },
  mounted() {
    axios({
      method: 'GET',
      url: url + this.$route.params.pk + '/my_page/',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    })
      .then(response => {
        this.userdetail = response.data
        this.articlelist = response.data.article
        this.comlist = response.data.comment
        console.log(response.data.article)
      })
      .catch(response => {
        console.log('에러')
        console.log(response.response.data)
      })
  },
}
</script>
<style scoped>

.artlist {
  border: 1px solid black;
}

</style>