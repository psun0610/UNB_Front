<template>
  <div>
    <h3>{{ article.title }}</h3>
    <GameDelete v-if="IsAuthor" :slug="article.slug" />
  </div>
</template>
<script>
import {csrftoken} from '../csrf/csrf_token'
import GameDelete from '../components/GameDelete'
export default {
  props: {
    slug: {
      type: String,
      required: true,
    }
  },
  components: {
    GameDelete
  },
  data () {
    return {
      article: {},
      requestUser: null
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {
    getArticleData() {
      fetch(`api/articles/${this.slug}/`, {
        methods: "GET",
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': csrftoken
        }
      })
      .then(resp => resp.json())
      .then((data) => {
        this.articles = data
      })
      .catch(error => console.log(error))
      },
      getUserRequest() {
        this.requestUser = localStorage.getItem("username")
      }
  },
  computed: {
    IsAuthor() {
      return this.article.author === this.requestUser
    }
  },

  created() {
    this.getArticleData()
    this.getUserRequest()
  }
}
</script>
