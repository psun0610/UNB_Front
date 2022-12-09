import router from '@/router'
import axios from 'axios'
const loginStore = {
  state: {
    userInfo: null,
    isLogin: false,
    isLoginError: false
  },
  mutations: { // 로그인 상태를 변경해주는 코드
    loginSuccess: function (state, payload) {
      state.userInfo = payload
      state.isLogin = true
      state.isLoginError = false
    },
    loginError: function (state) {
      state.userInfo = null
      state.isLogin = false
      state.isLoginError = false
    },
    logoutTest: function (state) {
      state.userInfo = null
      state.isLogin = false
      state.isLoginError = false
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('vuex')
    }
  },
  actions: {
    login (dispatch, loginObj) {
      axios
        .post('http://localhost:8000/accounts/login/', loginObj) // 로그인 URL로 ID, PW를 보냄
        .then((res) => {
          const token = res.data.access_token
          localStorage.setItem('access_token', token) // 토큰을 저장함
          const refretoken = res.data.refresh_token
          localStorage.setItem('refresh_token', refretoken) // 토큰을 저장함
          console.log('토큰을 받아옴')
          console.log(res)
          axios.defaults.headers.common.Authorization = `Bearer ${token}`
          this.dispatch('getMemberInfo') // 유저 정보를 가져오는 actions 호출
        })
        .catch(() => {
          alert('소셜 로그인 오류. 관리자에게 문의하세요.')
        })
    },
    kakaologin(dispatch, code){
      axios.get(`http://localhost:8000/accounts/kakao/callback/?code=${code}`)
      .then((response) => {
        console.log(response)
        const token = response.data.access_token
        localStorage.setItem('access_token', token) // 토큰을 저장함
        const refretoken = response.data.refresh_token
        localStorage.setItem('refresh_token', refretoken) // 토큰을 저장함
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        this.dispatch('getMemberInfo') // 유저 정보를 가져오는 actions 호출
      })
      .catch((err)=>{
        alert('소셜 로그인 오류. 관리자에게 문의하세요.')
      })
    },
    googlelogin(dispatch, code){
      axios.get(`http://localhost:8000/accounts/google/callback/?code=${code}`)
      .then((response) => {
        console.log(response)
        const token = response.data.access_token
        localStorage.setItem('access_token', token) // 토큰을 저장함
        const refretoken = response.data.refresh_token
        localStorage.setItem('refresh_token', refretoken) // 토큰을 저장함
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        this.dispatch('getMemberInfo') // 유저 정보를 가져오는 actions 호출
      })
      .catch((err)=>{

      })
    },
    logouttest_act ({ commit }) { // 로그아웃 actions
      commit('logoutTest')
      window.location.href="http://localhost:8080/"
    },
    getMemberInfo ({ commit }) { // 토큰으로 유저 정보를 받아오는 코드
      const token = localStorage.getItem('access_token') // 저장된 access 토큰을 가져옴
      const config = {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
      axios
        .get('http://localhost:8000/accounts/user/', config) // 가져온 토큰을 헤더에 Authorization 로 담아서 요청을 보냄
        .then((response) => {
          console.log('accounts/user에 보냄')
          const userInfo = {
            pk: response.data.pk,
            email: response.data.email,
          } // 유저 정보를 받아옴
          commit('loginSuccess', userInfo) // mutations 호출
          console.log('유저 정보 받아옴')
          console.log(userInfo)
          console.log(loginStore.state.isLogin)
          window.location.href="http://localhost:8080/logincheck/"
          // router.push('logincheck')
        })
        .catch(() => {
          alert('이메일과 비밀번호를 확인하세요.')
        })
    }
  }
}

export default loginStore
