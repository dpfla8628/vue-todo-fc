### localstorage 사용방법
-> lowdb (lodash기반) 설치     
npm i lodash lowdb    
    
import lowDb from 'lowdb'     
import LocalStorage from 'lowdb/adapters/LocalStorage'     
     
### dayjs
dayjs : momentjs 가벼운 버전/ 시간 포맷       
npm i dayjs      

### nextTick    
nextTick : 랜더링 보장 , 위의 코드들이 적용되고 나서 실행      

### Router
router를 이용한 페이지 이동 방법    
- <h2 @click="$router.push('/todos')">   
- <router-link to="todos" tag="h2">   

### 히스토리모드 vs 해시모드
https://router.vuejs.org/kr/guide/essentials/history-mode.html#%E1%84%89%E1%85%A5%E1%84%87%E1%85%A5-%E1%84%89%E1%85%A5%E1%86%AF%E1%84%8C%E1%85%A5%E1%86%BC-%E1%84%8B%E1%85%A8%E1%84%8C%E1%85%A6
서버를 만들어 제공하기 위해서는 히스토리 모드를 쓰자

## 페이지 구성
- SPA (Single Page Application)   
: 현재 페이지를 동적으로 router 작성    
Client(/ , /about, /todos) --> index.html(div#app) -(main.js)-> App.vue(router-view) -(index.js)-> Home.vue ,...