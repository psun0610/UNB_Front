<template>
  <div>
  <!-- 오늘의 토론왕 -->
    <div class="today-king my-shadow">
      <div class="today-king-title">
        오늘의 토론왕<img src="../assets/crown.png" style="width: 50px;">
      </div>
      <div class="rollingbanner ">
          <div class="wrap">
              <ul>
                <li class="current"><a href="#">1. {{today_1st}}</a></li>
                <li class="next"><a href="#">2. {{today_2nd}}</a></li>
                <li class="prev"><a href="#">3. {{today_3rd}}</a></li>
              </ul>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
const url = 'https://www.unbback.cf/'
export default {
  components: {},
  data () {
    return {
      sampleData:'',
      today_1st:'',
      today_2nd:'',
      today_3rd:'',
    }
  },
  setup () {},
  created () {},
  mounted () {
    axios.get(url+'profiles/best_user/')
    .then((resposne)=>{
      axios.get(url + 'accounts/' + resposne.data[0].user + '/my_page/',)
      .then((res) => {
        this.today_1st = res.data.userinfo.nickname
      })

      axios.get(url + 'accounts/' + resposne.data[1].user + '/my_page/',)
      .then((res) => {
        this.today_2nd = res.data.userinfo.nickname
      })

      axios.get(url + 'accounts/' + resposne.data[2].user + '/my_page/',)
      .then((res) => {
        this.today_3rd = res.data.userinfo.nickname
      })

    })
    document.addEventListener('DOMContentLoaded', ()=>{
    var interval = window.setInterval(rollingCallback, 3000);
})
  function rollingCallback(){
    //.prev 클래스 삭제
    document.querySelector('.rollingbanner .prev').classList.remove('prev');

    //.current -> .prev
    let current = document.querySelector('.rollingbanner .current');
    current.classList.remove('current');
    current.classList.add('prev');

    //.next -> .current
    let next = document.querySelector('.rollingbanner .next');
    //다음 목록 요소가 널인지 체크
    if(next.nextElementSibling == null){
        document.querySelector('.rollingbanner ul li:first-child').classList.add('next');
    }else{
    	//목록 처음 요소를 다음 요소로 선택
        next.nextElementSibling.classList.add('next');
    }
    next.classList.remove('next');
    next.classList.add('current');
  } 
  },
  unmounted () {},
  methods:{}
}
</script>
<style scoped>
.today-king {
  max-width: 100%;
  height: 50px;
  margin: 120px 0 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 5px solid #4BBEFF;
  border-left: 5px solid #4BBEFF;
  border-bottom: 5px solid #FF719B;
  border-right: 5px solid #FF719B;
  padding: 0 7vmin;
  font-weight: bold;
}
.today-king-title {
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 17px;
}
.rollingbanner{
    position: relative;
    width: 150px;
    height: 32px;
    font-size: 1rem;
    letter-spacing: -1px;
    padding: 7px 15px;
    box-sizing: border-box;
    border-radius: 16px;
}
/* 롤링 배너 */
.rollingbanner > .wrap{
    position: relative;
    width: auto;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
}        
.rolling ul{
    list-style: none;
}
.rollingbanner li{
    position: absolute;
    top: -36px;
    left: 0;
}
/* 이전, 현재, 다음 롤링 배너 표시 */
.rollingbanner li.prev{
    top: 36px;
    transition: top 0.5s ease;
}
.rollingbanner li.current{
    top: 0;
    transition: top 0.5s ease;
}
.rollingbanner li.next{
    top: -36px;
}
.rollingbanner a{
    display: block;
    display: -webkit-box;
    text-decoration: none;
    -webkit-line-clamp: 1;
    -webkit-box-orient:vertical;
    overflow: hidden;
    color: #000;
}
</style>