import router from '@/router'
import axios from 'axios'
const loginStore = {
  state: {
    userInfo: null,
    isLogin: false,
    isLoginError: false,
    random_list: []
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
    },
    numberregistration: function (state, code) {
      state.random_list.push(code)
    }
  },
  actions: {
    login (dispatch, loginObj) {
      axios
        .post('https://www.unbback.cf/accounts/login/', loginObj) // 로그인 URL로 ID, PW를 보냄
        .then((res) => {
          const token = res.data.access_token
          localStorage.setItem('access_token', token) // 토큰을 저장함
          const refretoken = res.data.refresh_token
          localStorage.setItem('refresh_token', refretoken) // 토큰을 저장함
          axios.defaults.headers.common.Authorization = `Bearer ${token}`
          this.dispatch('getMemberInfo') // 유저 정보를 가져오는 actions 호출
        })
        .catch((error) => {
          const err = error.response.data
          try {
            if(err.email[0] == '이 필드는 null일 수 없습니다.') {
              alert('이메일을 입력하세요.')
            }
          } catch(e) {}
          try {
            if(err.password[0] == '이 필드는 null일 수 없습니다.') {
              alert('비밀번호를 입력하세요.')
            }
          } catch(e) {}
          try {
            if(err.email[0] == "유효한 이메일 주소를 입력하십시오.") {
              alert('유효한 이메일 주소를 입력하세요.')
            }
          } catch(e) {}
          try {
            if(err.non_field_errors[0] == '주어진 자격 증명으로 로그인이 불가능합니다.') {
              alert('이메일이나 비밀번호가 틀렸습니다.')
            }
          } catch(e) {}
        })
    },
    kakaologin(dispatch, code){
      axios.get(`https://www.unbback.cf/accounts/kakao/callback/?code=${code}`)
      .then((response) => {
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
      axios.get(`https://www.unbback.cf/accounts/google/callback/?code=${code}`)
      .then((response) => {
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
    randomcheck(state, code){
      if (code in state.state.random_list){
      } else {
        this.commit('numberregistration', code)
      }
    },

    logouttest_act ({ commit }) { // 로그아웃 actions
      commit('logoutTest')
      window.location.href="https://www.unbalace.cf/"
    },
    getMemberInfo ({ commit }) { // 토큰으로 유저 정보를 받아오는 코드
      const token = localStorage.getItem('access_token') // 저장된 access 토큰을 가져옴
      const config = {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
      axios
        .get('https://www.unbback.cf/accounts/user/', config) // 가져온 토큰을 헤더에 Authorization 로 담아서 요청을 보냄
        .then((response) => {
          const userInfo = {
            pk: response.data.pk,
            email: response.data.email,
          } // 유저 정보를 받아옴
          commit('loginSuccess', userInfo) // mutations 호출
          window.location.href="https://www.unbalace.cf/"
          // router.push('logincheck')
        })
        .catch(() => {
          alert('이메일과 비밀번호를 확인하세요.')
        })
    }
  }
}

export default loginStore
