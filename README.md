# 🕊 영화 소개 페이지 만들기
## ✨ 목표 정하기
- **진짜 영화 정보**를 제공하는 검색 사이트 만들기
- **HTML, CSS, JavaScript** 만으로 API와 소통하며 웹 애플리케이션 만들기
- 영화 팬들을 위한 **멋진 UI**로, 데이터를 시각적으로 표현하기
- 🦸‍♂️ **API 마스터**: 개발자가 되는 첫 걸음으로 실시간 데이터를 사용하는 법 익히기!

- 🔭[배포용 링크] https://jongha56.github.io/MovieSite/
<br>

## 💻기술 스택
<div style="display:flex; justify-contents: center;">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
  <img src="https://img.shields.io/badge/git-orange?style=for-the-badge&logo=git&logoColor=white">

  
</div>
<br>

## ✔필수 요구사항

 - ✅ TMDB API 연동 및 데이터 가져오기
 - ✅ 영화 카드 리스트 UI 구현
 - ✅ 영화 상세 페이지 구현
 - ✅ 영화 검색 기능 구현

<br>

## 👍선택 요구사항

 - ✅ 로컬 저장소 활용한 ‘북마크’ 기능
 - ✅ async/await로 API 호출 리팩터링

---

  ## 🎥기능 구현
 ### - TMDB API 활용
 ![1  영화데이터](https://github.com/user-attachments/assets/7ed454b7-325f-438c-ab4b-c7ced4e8039e)<br/>
 
      TMDB API 를 통해 영화 데이터 정보를 받아오고,
      해당 내용을 section 태그에서 카드 리스트 UI 를 출력합니다.

 ### -  모달 기능 구현
 ![2  모달](https://github.com/user-attachments/assets/b76a9c9c-fbfc-4b37-a25b-8998168da7a8)<br/>
 
      영화 카드를 클릭했을 때, 영화의 상세정보를 확인할 수 있는 모달 기능을 구현했습니다.
      또한 모달에 북마크 추가/해제 기능을 구현했습니다.

 ### -  검색 기능 구현
 ![3  검색](https://github.com/user-attachments/assets/2b40bf98-7e6c-48b8-a12b-6f566cb17ccd)<br/>
 
      input 태그 안에 영화 제목을 입력하면 관련된 영화들을 검색해주는 기능을 구현했습니다.
      대소문자를 구별 없이 검색을 해주도록 코드를 작성했습니다.

 ### -  북마크 기능 구현
 ![4  북마크](https://github.com/user-attachments/assets/4c91e2de-ceaf-4be4-b2c7-73884cefd65d)<br/>
 
      로컬 스토리지를 이용해 원하는 영화들을 저장할 수 있도록 구현했습니다.
      북마크 보기 버튼 클릭 시 로컬 스토리지에 저장되어 있는 영화들에 대한 정보 UI 를 출력합니다.
