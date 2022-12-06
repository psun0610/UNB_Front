<template>
  <div>
    <div> 유저 이름 {{userdetail.nickname}} </div>
    <div> 유저가 쓴 글 {{userdetail.article}} </div>
  </div>
</template>

<script>
const url = 'http://localhost:8000/accounts/'
import axios from '../axios'
export default {
  data(){
    return {
      userdetail: []
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
        console.log(this.userdetail)
      })
      .catch(response => {
        console.log('에러')
        console.log(response.response.data)
      })
  },
}
</script>