<template>
  <div class="container2" v-show="user_pk">
    <div class="badge-edit-wrap">
      <!-- 현재 뱃지 -->
      <img :src="current_badge" class="current-badge my-shadow" @click="isFolding()">
      <div>

        <div style="display: flex; flex-direction: column;">
          <button v-if="usercheck && !edit_open" class="edit-btn no-kg-font my-shadow" @click="editOpen()"
            style="margin-right:7px">프로필 편집</button>
          <button v-else-if="usercheck" class="edit-done-btn no-kg-font my-shadow" @click="[editClose(), nameChange()]"
            style="margin-right:7px">완료</button>
          <p v-if="realuserpk == user_pk && edit_open" class="delete-btn no-kg-font"
            @click="accountsAlert()">계정 탈퇴하기</p>
          </div>
      </div>
    </div>
    <!-- 뱃지컬렉션 -->
    <div class="badge-collection my-shadow" v-if="isOpen && usercheck">
      <div v-for="(badge, index) in user_badges" :key="index"><!-- @click="badgeChange"-->
        <img :src="badge[0]" class="my-shadow" @click="badgeChange(badge)" />
      </div>
    </div>
    <!-- 이름과 활동지수 -->
    <div class="profile-container">
      <div class="name-exp-wrap">
        <h2 v-if="!edit_open">{{ nickname }}</h2>
        <input v-else type="text" v-model="nickname" class="name-edit-input no-kg-font" autocomplete="off">
        <div style="display: flex;">
          <p>총 활동지수 <b>{{ user.all_score }}</b></p>
          <p>오늘의 활동지수 <b>{{ user.today_score }}</b></p>
        </div>
      </div>
      <div class="exp-bar my-shadow">
        <div class="current-exp" :style="`background-color:${current_color}; width: ${userinfo.grade_percent}%;`">
        </div>
      </div>
      <div class="level">
        <p style="font-size: 15px; font-weight: bold;" :style="`color:${current_color}`">
          {{ current_level }}</p>
        <p>{{ next_level }}까지 <b>{{ next_exp }}</b></p>
      </div>
    </div>

    <!-- 잔디 심기 -->
    <div class="grass-div my-shadow">
      <div class="grass-title kg-font">
        <h3>{{ user.year }}</h3>
        <h1>{{ user.month }}</h1>
        <p class="no-kg-font">현재 연속 <b>{{ user.consecutive }}</b>일</p>
      </div>
      <div class="grass-wrap">
        <div v-for="index in user.monthrange" style="display: flex">
          <div v-if="index == 6 || index == 16 || index == 26" class="blank"></div>
          <!-- 리스트 포함 여부 확인 -->
          <div v-if="user.daylist.includes(index)" class="grass" style="background-color: #2DD92A"></div>
          <div v-else class="grass"></div>
        </div>
      </div>
    </div>

    <div class="article-comment-container">
      <input type="radio" name="artcom" id="article" v-model="picked" value="article" style="display: none" checked>
      <label class="profile-radio" for="article">{{ userinfo.nickname }}님이 작성한 글</label>

      <input type="radio" name="artcom" id="comment" v-model="picked" value="comment" style="display: none">
      <label class="profile-radio" for="comment">{{ userinfo.nickname }}님이 작성한 댓글</label>
    </div>
    <div class="arttable">
      <div v-if="(picked == 'article')">
        <h4 v-if="articlelist.length == 0" style="margin-top: 40px;">작성한 글이 없어요</h4>
        <div v-else v-for="(article, index) in articlelist.slice().reverse()" :key="index" class="artlist my-shadow">
          <router-link :to="'/Detail/' + article.pk" class="article-router">
            <div class="article">
              <h2 class="kg-font" style="margin: 0; font-size: 22px;">{{ article.title }}</h2>
              <div class="article-wrap">
                <div>{{ article.A }}</div>
                <h3 class="kg-font" style="font-size: 20px; margin: 0 10px;"><span
                    style="color: var(--mypink)">V</span><span style="color: var(--myblue)">S</span></h3>
                <div>{{ article.B }}</div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="comtable">
      <div v-if="(picked == 'comment')">
        <h4 v-if="comlist.length == 0" style="margin-top: 40px;">작성한 댓글이 없어요</h4>
        <div v-else v-for="(com, index) in comlist.slice().reverse()" :key="index" class="comlist">
          <router-link :to="'/Detail/' + com.article_pk" class="article-router">
            <div class="article artlist my-shadow">
              <h3 class="kg-font" style="font-size: 22px; margin: 0 0 10px;">{{ com.article }}</h3>
              <div style="display: grid; grid-template-columns: 8fr 1fr 8fr; margin-bottom: 10px;">
                <h4 style="margin: 0;">{{ com.A }}</h4>
                <h3 class="kg-font" style="margin: 0 10px;">
                  <span style="color: var(--mypink)">V</span>
                  <span style="color: var(--myblue)">S</span>
                </h3>
                <h4 style="margin: 0;">{{ com.B }}</h4>
              </div>
              <p style="margin: 0; font-size: 16px;">{{ com.content }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import axios from '../axios/index'
import axios2 from 'axios'
import loginStore from '../store/index'
const url = 'https://www.unbback.cf/accounts/'
export default {
  data() {
    return {
      usercheck: false,
      user: '',
      userinfo: '',
      current_badge: '',
      user_badges: [],
      articlelist: [],
      comlist: [],
      isOpen: false,
      picked: 'article',
      current_level: '',
      current_color: '',
      next_level: '',
      next_exp: '',
      exp_percent: '',
      badge_pick: '',
      edit_open: false,
      nickname: '',
      realuserpk: '',
    }
  },
  mounted() {
    if (JSON.parse(localStorage.getItem('vuex'))) {
      if (JSON.parse(localStorage.getItem('vuex')).loginStore.isLogin) {
        const login_user_pk = JSON.parse(localStorage.getItem('vuex')).loginStore.userInfo.pk
        if (login_user_pk == this.$route.params.pk) {
          this.usercheck = true
          this.realuserpk = loginStore.state.loginStore.userInfo.pk
        }
      }
    }


    axios2({
      method: 'GET',
      url: url + this.$route.params.pk + '/my_page/'
    })
      .then(response => {
        this.user_pk = response.data.user_pk
        this.user = response.data
        this.userinfo = response.data.userinfo
        this.current_badge = require(`../assets${response.data.userinfo.profiles.badge.image}`)
        response.data.userinfo.user_badges.forEach((current, index, array) => {
          this.user_badges.push([require(`../assets${current.badge.image}`), current.badge.pk])
        })
        this.articlelist = response.data.userinfo.article
        this.comlist = response.data.comment
        this.nickname = this.userinfo.nickname
        // 레벨 분기
        const grade = response.data.userinfo.profiles.grade
        const level = [
          ['Unranked', '#3eb489'],
          ['Bronze', 'rgb(123 93 77)'],
          ['Silver', 'rgb(176 176 176)'],
          ['Gold', '#ffd700'],
          ['Platinum', '#deefed'],
          ['Diamond', '#a0b2c6'],
          ['Master', '#8b00ff']
        ]
        this.current_level = level[grade - 1][0]
        this.current_color = level[grade - 1][1]
        if (grade === 7) {
          this.next_level = '준비중'
        } else {
          this.next_level = level[grade][0]
        }
        const exp = [0, 30, 300, 600, 1000, 1600, 2500]
        this.next_exp = exp[grade] - response.data.all_score
      })
      .catch(error => {
        if (error.response.data.detail == '찾을 수 없습니다.') {
          alert('탈퇴한 계정입니다.')
        }
      })
  },
  methods: {
    isFolding() {
      if (this.isOpen == true) {
        this.isOpen = false
      } else {
        this.isOpen = true
      }
    },
    badgeChange(badge) {
      const badge_pk = badge[1]
      axios({
        url: url + this.$route.params.pk + '/my_page/',
        method: 'PUT',
        data: {
          test: 'test',
          user_pk: this.user_pk,
          badge_pk: badge_pk,
        }
      })
        .then(response => {
          const badge_image = response.data.image
          this.current_badge = require(`../assets${badge_image}`)
        }).catch(err => {
          console.error(err)
        })
    },
    editOpen() {
      this.edit_open = true
      this.isOpen = true
    },
    editClose() {
      this.edit_open = false
      this.isOpen = false
    },
    nameChange() {
      axios({
        url: url + this.$route.params.pk + '/my_page/',
        method: 'PATCH',
        data: {
          nickname: this.nickname
        }
      })
        .then(response => {
          this.nickname = response.data.nickname
        }).catch(err => {
          console.error(err)
        })
    },
    accountsAlert() {
      var return_value = confirm('정말 탈퇴하시게요? ㅠㅠ..');
      if(return_value == true) {
        accountsDelete();
      }
    },
    accountsDelete() {
      axios.delete(url + this.$route.params.pk + '/my_page/')
      this.$store.dispatch('logouttest_act')
      window.location.href = 'https://www.unbalace.cf/'
    }
  }
}
</script>
<style scoped>
#article+label:hover,
#comment+label:hover {
  background-color: #c4c4c4;
  scale: 1.05;
  transition: all .05s ease-in;
}

#article:checked+label {
  background-color: #4BBEFF;
  scale: 1.05;
  transition: all .15s ease;
}

#comment:checked+label {
  background-color: #FF719B;
  scale: 1.05;
  transition: all .15s ease;
}

.container2 {
  margin: 100px auto;
  max-width: 500px;
}

.badge-edit-wrap {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.current-badge {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  transition: all .05s ease-in;
}

.current-badge:hover {
  scale: 1.05;
  transition: all .05s ease-in;
}

.edit-btn {
  background-color: #D9D9D9;
  border-radius: 3px;
  border: 0;
  padding: 10px 18px;
  margin-bottom: 15px;
}

.edit-btn:hover {
  background-color: #c4c4c4;
  scale: 1.05;
  transition: all .05s ease-in;
}

.delete-btn {
  cursor:pointer;
  margin: 8px 0 0 0;
  color: dimgray;
  font-weight: bold;
  font-size: 14px;
}

.delete-btn:hover {
  scale: 1.05;
  transition: all .05s ease-in;
}

.edit-done-btn {
  background-color: rgb(255, 62, 130);
  border-radius: 3px;
  border: 0;
  padding: 10px 18px;
  margin-bottom: 0;
  color: white;
  font-weight: bold;
}

.edit-done-btn:hover {
  background-color: rgb(236, 61, 122);
  scale: 1.05;
  transition: all .05s ease-in;
}

.name-edit-input {
  font-size: 16px;
  padding: 5px 10px;
  width: 150px;
}

.badge-collection {
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 90px));
  margin: 30px 0 0 0;
}

.badge-collection img {
  display: inline-block;
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
  transition: all .05s ease-in;
}

.badge-collection img:hover {
  scale: 1.05;
  transition: all .05s ease-in;
}

/* 이름과 활동지수 */
.profile-container {
  margin: 30px 0;
}

.name-exp-wrap {
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
}

.name-exp-wrap>h2 {
  margin: 0;
}

.name-exp-wrap>div {
  margin-left: 8px;
}

.name-exp-wrap p {
  margin: 0 6px;
  color: gray;
  font-size: 15px;
}

.exp-bar {
  position: relative;
  height: 20px;
  background-color: rgb(224, 224, 224);
  border-radius: 20px;
  overflow: hidden;
}

.current-exp {
  position: absolute;
  left: 0;
  top: 0;
  height: 20px;
  border-radius: 20px;
}

.level {
  display: flex;
  justify-content: space-between;
  margin: 6px 15px;
}

.level>p {
  margin: 0;
  font-size: 14px;
  color: gray;
}

.article-comment-container {
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

.profile-radio {
  margin: 0 10px;
  padding: 10px 18px;
  background-color: #D9D9D9;
  font-size: 14px;
  border-radius: 3px;
}

.artlist {
  margin-top: 30px;
}

.article-wrap {
  display: grid;
  grid-template-columns: 4fr 1fr 4fr;
}

.article {
  padding: 20px;
  transition: all .1s ease-in;
}

.article:hover {
  transform: scale(1.07);
  transition: all .1s ease-in;
}

/* 잔디심기 */
.grass-div {
  /* padding: 20px 40px; */
}

.grass-title {
  display: flex;
  align-items: flex-end;
  width: calc((17px + 6px * 2)*11);
  margin: 0 auto;
}

.grass-title>h1 {
  margin: 0 5px;
  font-size: 23px;
}

.grass-title>h3 {
  margin: 0 0 5px 0;
  font-size: 15px;
}

.grass-title>p {
  margin: 0 0 5px 8px;
  font-size: 15px;
}

.grass-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 15px auto 0;
  width: calc((17px + 6px * 2)*11);
}

.grass {
  width: 17px;
  height: 17px;
  background-color: #D9D9D9;
  border-radius: 50%;
  margin: 10px 6px;
}

.blank {
  width: 10px;
  height: 17px;
  margin: 4px;
}
</style>