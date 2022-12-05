<template>
  <div>
    <form @submit.prevent="insertArticle">
      <input
      type="text"
      placeholder="A"
      v-model="selectA"
      />
      <input
      type="text"
      placeholder="B"
      v-model="selectB"
      />
      <button>제출하기</button>
    </form>
    <div v-if="error" role="alert">
      <strong>{{ error }}</strong>
    </div>
  </div>
</template>
<script>
import {csrftoken} from '../csrf/csrf_token';
export default {
  components: {},
  data () {
    return {
      selectA: null,
      selectB: null,
      error: null,
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {
    insertArticle() {
      if(!this.selectA || !this.selectB) {
        this.error = "선택지를 모두 채워주세요"
      } else {
        fetch(`api/articles/${this.slug}/`, {
        methods: "POST",
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': csrftoken
        },
        body: JSON.stringify({selectA: this.selectA, selectB: this.selectB})
      })
      .then(resp => resp.json())
      .then(() => {
        this.$router.push({
          name: 'home'
        })
      })
      .catch(error => console.log(error))
      }
    }
  }
}
</script>