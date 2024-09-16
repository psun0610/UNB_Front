# 👑UNB (언발란스) 프론트엔드👑

~~https://www.unbalace.cf/~~

➡️ 서버비 이슈로 URL 접속 불가 상태

![로고1](https://user-images.githubusercontent.com/97274144/208597017-908400e8-9c40-4343-a086-819a80f53fb4.png)

## 목차
0. **개발 목적**
1. **서비스 소개**
2. **기술 스택**
3. **프로젝트 주요 기획 구현 내용**
4. **개발 팀 소개**
5. **개발 기간 및 일정**
6. **서비스 둘러보기**
7. **프로젝트 후기**

&nbsp;

## 0. 🚩개발 목적

그동안 Django만을 사용해 풀스택 개발을 해온 팀원들끼리 모여, 백엔드와 프론트엔드 환경을 완전히 분리된 프로젝트를 경험하기 위해 프로젝트를 시작했습니다. 그동안 바닐라 자바스크립트만을 사용하여 개발하였는데 자바스크립트 프레임워크를 경험해보고자 Vue.js를 택해 개발하였습니다.

&nbsp;

## 1. 📃서비스 소개

UNB는 다양한 주제들로 양자택일 토론을 하고, 가볍게 즐길 수 있는 사이트입니다. 또한 뱃지와 등급제도를 통해 한 번 사용하고 마는 사이트가 아닌, 사용자들이 지속적으로 즐길 수 있는 서비스입니다.

&nbsp;

## 2. 💻기술 스택

개발: Vue.js, HTML, CSS, Javascript

프론트엔드 배포: Vercel

&nbsp;

## 3. 📌프로젝트 주요 기획 구현 내용

- 사용자 회원가입 유도
  - **비회원은 댓글을 달 수 없고** 댓글 열람과 게임 Pick만 할 수 있다.
  - 다만 사용자 편의를 위하여 **소셜 로그인 기능**을 적용하여 빠르고 간편하게 즐길 수 있도록 하여 회원가입을 유도한다.
- 승부욕 자극
  - **경험치, 등급제도, 뱃지, 토론왕** 등의 요소로 유저들의 승부욕을 자극한다.
  - 달성 목표 (회원 등급 제도를 통한 뱃지 지급)를 만들고 사람들이 몰입할 수 있도록 하여 회원을 유지시킨다.
- 유저가 직접 만드는 밸런스 게임
  - 회원가입 이후 직접 밸런스 게임을 만들 수 있으며, 이를 통해 사람들의 반응에 재미를 느낄 수 있게 한다.

&nbsp;

## 4. ⭐팀원 소개 및 역할

<a href="https://github.com/psun0610/UNB_Back/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=psun0610/UNB_Back" style="zoom: 150%;"/>
</a>

|    이름    |                      역할                       |
| :--------: | :---------------------------------------------: |
| **박선영** |       프론트엔드 전반 개발, 디자인, 조장        |
| **하승찬** |          백엔드 전반 개발, 인프라 구축          |
| **이진욱** | 프론트엔드 전반 개발 및 로그인, 소셜로그인 개발 |
| **이준엽** |                   풀스택 개발                   |
| **김광표** |          백엔드 전반 개발, 인프라 구축          |

&nbsp;

## 5. 🗓프론트엔드 개발 기간 및 일정

1. **개발 기간 : 2022 11/25 ~ 12/14** (총 3주)
2. **개발 일정**

|         구분          |         기간          |                             활동                             |       비고        |
| :-------------------: | :-------------------: | :----------------------------------------------------------: | :---------------: |
|       사전 기획       | 11/25(목) ~ 11/28(월) |          프로젝트 기획 및 주제 선정<br>기획안 작성           |   아이디어 선정   |
|   모델링 및 피그마    | 11/29(화) ~ 11/30(수) |                앱 및 모델 구현 & 피그마 작성                 |                   |
|     DRF, Vue 학습     | 11/29(화) ~ 12/2(금)  |            각자 필요한 기술 스택에 관한 개인 공부            |                   |
|      서비스 개발      | 12/2(금) ~ 12/11(일)  |                   프론트엔드 & 백엔드 개발                   |                   |
| 서비스 배포 및 디버깅 | 12/12(월) ~ 12/13(화) | AWS, Vercel을 활용한 서비스 배포<br>배포 설정 및 디버깅<br>모바일 최적화 | 최적화, 오류 수정 |
|      총 개발기간      | 11/25(목) ~ 12/14(수) |                                                              |      총 3주       |

&nbsp;

## 6. 🔎서비스 둘러보기
> 모든 페이지는 반응형 구현하여 모바일에서도 편히 사용가능하다. (캡처 전에 서비스 문을 닫아버려서 캡처를 못함..)

### 메인페이지

- 오늘의 토론왕 랭킹이 1~3등까지 번갈아가며 나옵니다.
  - 오늘의 토론왕은 매일 00시에 업데이트 된다.
  - 오늘의 토론왕은 특정 기준으로 오늘 하루동안의 점수를 측정하여 실시간으로 반영된다.
- 오늘의 토론은 토론들 중 하나가 랜덤으로 매일 00시에 업데이트 된다.

![이미지](https://user-images.githubusercontent.com/97274144/208605200-ce522af8-52e6-440d-bc5c-09d0968f90c5.png)

### 로그인 및 회원가입

- 일반 회원가입 및 로그인과 **소셜 로그인**이 가능하다.
- 회원가입은 다음 상황에서 경고창이 뜬다.
  1. 이메일이랑 비밀번호가 비슷할 때
  2. 비밀번호가 너무 짧을 때
  3. 비밀번호와 비밀번호 확인이 다를 때
  4. input을 채우지 않았을 때
- 로그인은 다음 상황에서 경고창이 뜬다.
  1. 이메일이나 비밀번호가 다르거나 없을 때
  2. input을 채우지 않았을 때


![image](https://user-images.githubusercontent.com/97274144/208605308-b4ac7d86-9a2a-475e-9e28-e3d4af29e230.png)
![image](https://user-images.githubusercontent.com/97274144/208605322-c6935e45-997f-4335-95c3-23413a071f74.png)



### 밸런스게임 페이지

- 게임 pick을 하면 댓글창이 생기고 게임에서 각 답의 퍼센트만큼 올라온다.
- 비회원인 경우 댓글을 달 수 없다.
  - 이를 통해 회원가입을 유도한다.
- 좋아요를 가장 많이 받은 베스트 댓글이 가장 위에 뜬다.
- 댓글은 각자가 고른 선택지 색깔로 표시된다.


![image](https://user-images.githubusercontent.com/97274144/208605562-b6fbb8c9-0253-4738-9bba-afeab26a7904.png)
![image](https://user-images.githubusercontent.com/97274144/208605575-ef61e545-a694-4527-902f-025f1f48c872.png)

### 토론리스트 페이지

- 오늘의 토론왕이 표시된다.
- 각 밸런스게임의 통계치가 표시된다.
- 무한 스크롤을 적용한다.
  - 토론 리스트는 굉장히 많기 때문에 페이지네이션, 무한 스크롤 중 하나를 적용하기로 한다.
  - 이 서비스는 사용자들이 가볍게 들어와 볼 수 있는 사이트이기 때문에 편하게 내리며 볼 수 있는 무한 스크롤이 더 유리할 것으로 생각되어 무한 스크롤을 적용한다.

![image](https://user-images.githubusercontent.com/97274144/208605361-1fe621b4-6aee-4f3c-aace-5ba48b9e4538.png)

### 토론 만들기

- 사용자가 직접 밸런스게임을 만들 수 있다.

![image](https://user-images.githubusercontent.com/97274144/208605365-3a6152cf-3dfd-4823-b88e-37040db144c3.png)



### 마이 페이지 (및 다른 유저 페이지)

- 유저 등급제를 적용한다.
  - Unranked, 브론즈, 실버, 골드, 플레티넘, 다이아, 마스터 순으로 등급제를 실시한다.
  - 승급시 자동으로 알맞은 등급 색에 맞추어 경험치 바 색이 변한다.
  - 승급시 뱃지를 지급한다.
- 뱃지 제도를 적용한다.
  - 사용자는 승급, 이벤트 등을 통해 뱃지를 받을 수 있다.
  - 또한 00시에 오늘의 토론왕 1등으로 마무리한 사용자는 토론왕 뱃지를 받을 수 있다.
- 현재 사용중인 뱃지를 누르면 현재 가지고 있는 뱃지 리스트가 뜨고, 가지고 있는 뱃지들 중 사용하고 싶은 뱃지를 클릭하면 바로 적용되게 한다.
- 출석체크 제도를 적용한다.
  - 연속 출석체크 일수도 보여줘서 유저들을 유지한다.
- 프로필 편집을 클릭하면 뱃지 리스트가 열리고, 이름이 input으로 바뀌어 바로 수정할 수 있도록 한다.
- 계정 탈퇴를 클릭하면 정말 탈퇴할 것인지 확인하는 confirm창이 뜬다.
![image](https://user-images.githubusercontent.com/97274144/208605584-cf2cfcdb-970a-448c-b0ad-3815c03512ff.png)
![image](https://user-images.githubusercontent.com/97274144/208605591-27be0f77-155e-41d5-8eab-da93cebcdb2f.png)
&nbsp;

## 7. 💡프로젝트 후기

* 박선영

```jsx
이때까지 익숙하던 Django에서 벗어나서  처음으로 DRF와 Vue.js를  사용하여 프로젝트를 해보았다.
이정도로 아무 정보도 없이 야생에서 학습한 경험이 처음이라 프로젝트 초반에는 너무 막막했다.
그래서 초반에는 그냥 유튜브를 보고 이해만 해보자고 생각했었는데, 결국에는 직접 코드를 따라 쳐보면서 많이 익혔던 것 같다.
야생학습을 하면서 특히 구글과 유튜브에서 내가 필요한 최신 자료들을 찾는 것이 어려웠고 Vue.js는 특히나 React에 비해 검색 결과도 굉장히 적었다.
처음엔 Vue2인지 Vue3인지도 모르고 모두 찾아보았으나 나중에는 내가 필요한 정보만을 걸러서 보는 능력을 기를 수 있었다.
또한 스스로 학습하고 모르는 부분, 궁금한 부분을 알아가는 과정을 제대로 느껴보아서 너무 좋은 경험이었던 것 같다.
백엔드가 DRF를 이용하여 개발을 하니 프로젝트가 확실히 Django와 다르게 프론트와 백이 완전히 분리되어서 서로 필요한 부분에만 집중할 수 있어서 신기했고,
이것이 진정한 협업이 아닐까 하는 생각이 들었었다.
팀원들 모두들도 처음 배우는 부분이라 보니 처음에는 각자 공부를 했지만, 어느정도 서로 공부를 하고 이해를 한 이후부터는 정말 빠른 속도로 협업이 이루어져서 너무 신기했고 뿌듯했다.
파트를 각각 나눠서 집중을 하다 보니 효율이 정말 좋았던 것 같다.
처음에는 솔직히 배포까지는 힘들 거라고 생각했는데 팀원들이랑 모르는 부분은 서로 물어보고 같이 공부하다 보니 마음에 드는 프로젝트를 완성할 수 있어서 너무 뿌듯하고 재밌었다.
아직 Vue를 처음 해봐서  컴포넌트를 사용하여 코드를 더 깔끔하게 만들 수 있던 부분, data 관리 등에 있어서부족한 코드도 많지만 앞으로 배우면서 더 고쳐 나가면 좋을 것 같다!
```

* 하승찬

```jsx
야생학습이라는게 쉽지 않다는 걸 깨달았습니다.개인적으로 공식문서와 자료들로만 공부하는 것보다 다른 사람들이 앞서 걸었던 경험들을 찾아서 "왜? 이렇게 사용했을까" 라고 생각하다보며 습득하다보니 좀 더 쉽게 공부할 수 있었던 것 같습니다.
새로운 지식을 교육을 통해 배우는게 아니라 찾아서 학습하는 방법을 배웠고, 앞으로 어떻게 공부를 해야하는지에 대해 깨닳게 되는 계기가 되었던 것 같습니다.  
백과 프론트의 분리에 대해 어떻게 진행되는지 살짝 발을 담궈본 기분이네요. 모두 고생하셨습니다 재미있었어요! 
```

* 이진욱

```jsx
백엔드를 하려고했으나 프로젝트 초반에 프론트와 백엔드를 연결하는 것을 중점적으로 공부하다보니 프론트에 대한 이해도가 높아져 프론트 엔드 개발을 하게 되었습니다. 
첫주에는 너무 막막했고 공부하면서도 이걸 진짜 할 수 있을까 생각했었습니다. 
특히 vue는 react보다 올라오는 자료가 적고 시간이 얼마 지나지 않았음에도 최신 버전과 맞지 않는 자료도 많았습니다. 
그래도 본인의 지식을 공유해주신 여러 개발자분들 덕분에 vue에 대해 공부할 수 있었고 3주만에 vue로 간단한 웹페이지를 만들 수 있었습니다.
열정형을 선택한 것은 정말 좋은 선택이였습니다. 과정이 끝나가면서 느슨해졌는데 열정적인 팀원들에게 자극을 받을 수 있었고 불투명한 진로를 선택하는데 많은 도움이 된 것 같습니다.
또한, 프론트와 백을 분리해서 개발한 덕분에 프론트엔드 백엔드 각각의 이해도도 높아지고 협업하는 느낌을 강하게 받았습니다.
교육 과정 가장 마지막에 이러한 경험을 한다는 것이 너무 아쉬운 것 같습니다.
```

* 이준엽

```jsx
그전에는 Django 로만 개발을 진행해서 프론트와 백앤드를 왜나누는 건가에대한 의문을 가지고 프론트와 백 구분없이 오갔습니다.
하지만 이번 프로젝트를 통해 3주간의 기간동안 DRF 와 Vue라는 새로운 환경에서 개발을 해가면서 공부를 하다보니 프론트에서 API를 어떻게 활용하는지를 알수있었고 깊게는 아니지만
프론트와 백앤드가 협업을 한다면 이런식으로 하겠구나 라는것을 배울수있는 좋은 경험이었다고 생각합니다. 낯선 개발 환경에서도 해결점을 찾으려고 노력해준 팀원들에게 감사합니다.
```

* 김광표

```jsx
DRF에 대한 지식이 전혀 없는 상태로, RESTFUL API 개발을 해보고싶다는 생각 하나로 시작한 프로젝트였다. 
정말 제로베이스에서 시작했기에 처음에는 3주만에 완성 할 수 있을까 싶었지만 하다보니 
DRF도 결국 Django에서 비롯했고, Django와 크게 다르지 않다는 것을 깨달았다. 
새로운 것을 배워서 재미있었고, 프론트와 백엔드를 완전히 분리해서 개발을 하다보니 
더욱 더 협업이 중요했기에 협업에 대해 많이 배울 수 있는 시간이었다. 
```
