import axios from 'axios'
const axiosRefresh = axios.create()
const refreshtoken = {
  state: {
  },
  mutations: {
  },
  actions: {
    async refreshtt (dispatch, ReToken) {
      await axiosRefresh
        .post('http://localhost:8000/accounts/token/refresh/', ReToken) // 로그인 URL로 ID, PW를 보냄
        .then((response) => {
          const newToken = response.data.access
          localStorage.setItem('access_token', newToken)
          console.log(newToken)
        })
    }
  }
}
export default refreshtoken
