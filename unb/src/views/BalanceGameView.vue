<template>
  <div class="balance-game">
    <h3>{{ article.title }}</h3>
  </div>
</template>
<script>
import {csrftoken} from '../csrf/csrf_token'
export default {
  props: {
    slug: {
      type: String,
      required: true,
    }
  },
  components: {},
  data () {
    return {
      article: {}
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
    }
  },
  created() {
    this.getArticleData()
  }
}
</script>
