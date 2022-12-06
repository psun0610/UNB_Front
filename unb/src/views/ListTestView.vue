<template>
  <div>
    <b-table striped hover :items="bloglist" :fields="fields" @row-clicked="rowClick"></b-table>
    <div class="listWrapper">
      <div v-for="(el, index) in bloglist" :key="index" class="list">
        <!-- 페이지 이동 라우터 -->
        <router-link :to="'/Detail/' + el.pk">{{ el.title }}</router-link>
        <p>{{ el.content }}</p>
      </div>
    </div>
    <router-view :el="el"></router-view>
  </div>


</template>
<script>

import testaxios from '../axios/index'
const url = 'http://localhost:8000/articles/'

export default {
  data() {
    return {
      bloglist: [],
      fields: ['pk','title','user']
    }
  },
  setup() {},
  created() {},
  mounted() {
    testaxios ({
      method: 'GET',
      url: url,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    })
      .then(response => {
        this.bloglist = response.data
        console.log(response.data)
      })
      .catch(response => {
        console.log('access토큰 만료')
        console.log(response.response.data)
      })
  },
  unmounted() {},
  methods: {
    createblog() {

    },
    rowClick(item){
        this.$router.push({
          name:'Detail',
          params:{pk:item.pk}
        })
    },
  }
}

</script>
