<template>
  <div>
    <form @submit.prevent="updateArticle">
      <input
      type="text"
      placeholder="A"
      v-model="A"
      />
      <input
      type="text"
      placeholder="B"
      v-model="B"
      />
      <button>수정하기</button>
    </form>
    <div v-if="error" role="alert">
      <strong>{{ error }}</strong>
    </div>
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
      A: null,
      B: null,
      error: null,
    }
  },
  beforeRouteEnter (to, from, next) {
    if(to.params.slug !== undefined) {
      fetch(`/api/articles//${to.params.slug}/`, {
        methods: "GET",
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': csrftoken
        }
      })
      .then(resp => resp.json())
      .then((data) => {
        return next(vm=> (vm.A=data.A, vm.B=data.B))
      })
    } else {
      return next()
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {
    updateArticle() {
      if(!this.A || !this.B) {
        this.error = "선택지를 모두 채워주세요"
      } else {
        fetch(`api/articles/${this.slug}/`, {
        methods: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': csrftoken
        },
        body: JSON.stringify({A: this.A, B: this.B})
      })
      .then(resp => resp.json())
      .then(() => {
        this.$router.push('/')
      })
      .catch(error => console.error(error))
      }
    }
  }
}
</script>