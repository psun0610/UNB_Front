<template>
  <div>
    <div> {{article}} </div>
  </div>
</template>

<script>
const url = 'http://localhost:8000/articles/'
import axios from '../axios'
export default {
  data(){
    return {
      article: null
    }
  },
  mounted() {
    axios({
      method: 'GET',
      url: url + this.$route.params.pk + '/',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    })
      .then(response => {
        this.article = response.data
        console.log(response.data)
      })
      .catch(response => {
        console.log('에러')
        console.log(response.response.data)
      })
  },
}
</script>