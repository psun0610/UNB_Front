<template>
  <div>
    <button @click="deleteArticle">삭제</button>
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
      sampleData:''
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods:{
    deleteArticle() {
      fetch(`api/articles/${this.slug}/`, {
        methods: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': csrftoken
        }
      })
      .then(() => {
        this.$router.push("/")
      })
      .catch(error => console.log(error))
    },

    create() {
      this.getAllArticles()
    }
  }
}
</script>