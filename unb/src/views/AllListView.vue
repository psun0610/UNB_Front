<template>
  <div>
    <div v-for="article in articles" :key="article.id">
      <router-link
      :to="{name: 'balance-game', params: {slug: article.slug}}"
      >
        {{ article.title }}
        {{ article.content }}
      </router-link>
    </div>
  </div>
</template>
<script>
import {csrftoken} from '../csrf/csrf_token'
export default {
  components: {},
  data () {
    return {
      articles: [],
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {
    getAllArticles() {
      fetch('api/articles/', {
        methods: "GET",
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': csrftoken
        }
      })
      .then(resp => resp.json())
      .then((data) => {
        // 위에 data에 있는 articles 리스트에 게시글들을 담음
        // articles 리스트에 있는 데이터들을 template의 v-for로 반복문을 돌려서 뽑아냄
        this.articles.push(...data)
        console.log(data)
      })
      .catch(error => console.log(error))
    },
    create() {
      this.getAllArticles()
    }
  }
}
</script>