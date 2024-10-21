const searchInput = document.querySelector('#search-input');
const bookmarkBtn = document.querySelector('#bookmark-btn');
const movieList = document.querySelector('#movie-list');
const movieDetail = document.querySelector('#movie-detail');

const modalClose = document.querySelector('#modal-close');
const modalImg = document.querySelector('#modal-img');
const modalTitle = document.querySelector('#modal-title');
const modalContents = document.querySelector('#modal-contents');
const modalVoteAverage = document.querySelector('#modal-vote-average');
const addBookmark = document.querySelector('#add-bookmark');

let tempMovieData = {}; // 모달창을 띄운 영화에 대한 데이터를 임시로 넣을 변수

let url = `https://api.themoviedb.org/3/movie/popular?language=ko&page=1`;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjI3NDM3OTJmYTExMDlmZjliYzk3OTU0MmNhYmE0YiIsIm5iZiI6MTcyODk1NjI5MS44NjY2NzgsInN1YiI6IjY3MGRjM2M2MGI4MDA1MzdkNzVjYjRjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SujuOl1F-E-gei0PFevO6xn-fnLzj3ZISTWYeISBvkQ'
    }
};

async function getMovieData() {
    try {
        const movieData = await fetch(url, options);
        const jsonData = await movieData.json();
        const results = Object.keys(jsonData).includes('results') ? jsonData.results : jsonData;

        return results;
    } catch (err) {
        throw (err);
    }
}

function MakePosters(rows) {
    movieList.innerHTML = "";
    movieList.style.color = 'black';
    if (rows) {
        rows.forEach(e => {
            const title = e['title'];
            const posterPath = e['poster_path'];
            const voteAverage = e['vote_average'];
            const id = e['id'];

            const tempHtml = `
                <div class="movie-card" id="${id}">
                    <img src="https://image.tmdb.org/t/p/w500${posterPath}">
                    <h3>${title}</h3>
                    <p>⭐ ${voteAverage.toFixed(1)} / 10</p>
                </div>
            `
            movieList.innerHTML += tempHtml;
        });

        if (rows.length < 1) {
            movieList.style.color = 'white';
            movieList.innerHTML += `
            <div class="empty-movie">
                <p>관련 영화가 존재하지 않습니다.</p>
                <p>다시 검색해 주세요.</p> 
            </div>
            `;
        }
    }
}

async function ShowPoster() {
    const rows = await getMovieData();
    MakePosters(rows);
} ShowPoster();

function LoadSavedDatas() {
    let savedDatas = new Map();
    let JsonData = JSON.parse(localStorage.getItem('bookmarks'));

    if (JsonData) {
        for (let i = 0; i < JsonData.length; ++i) {
            savedDatas.set(JsonData[i][0], JsonData[i][1]);
        }
    }

    return savedDatas;
}

function CloseModal() {
    document.querySelector(".background").className = "background";
    document.body.classList.remove("overflow-hidden"); // 모달창 닫았을 때 뒤의 화면 스크롤바 속성 추가
}

searchInput.addEventListener("input", function () {
    const inputValue = searchInput.value.toLowerCase();
    const searchStr = inputValue.replace(' ', '+');

    url = searchStr === "" ? `https://api.themoviedb.org/3/movie/popular?language=ko&page=1` : `https://api.themoviedb.org/3/search/movie?query=${searchStr}&language=ko`;

    ShowPoster();
});

movieList.addEventListener("click", function (e) {
    const movieCard = document.querySelectorAll('.movie-card');
    movieCard.forEach(async function (card) {
        if (e.target.parentNode.id === card.id) {
            document.querySelector(".background").className = "background show";
            document.body.style.setProperty('--scrollbar-width', `${window.innerWidth - document.documentElement.offsetWidth}px`); // 스크롤바 너비 만큼 화면 고정
            document.body.classList.add("overflow-hidden"); // 모달창 띄웠을 때 뒤의 화면 스크롤 방지

            let savedMovieDatas = LoadSavedDatas();
            addBookmark.innerHTML = savedMovieDatas.has(card.id) ? "북마크 해제" : "북마크 추가";

            url = `https://api.themoviedb.org/3/movie/${card.id}?language=ko`;

            const movieinfo = await getMovieData();
            const title = movieinfo['title'];
            const overview = movieinfo['overview'];
            const voteAverage = `⭐ ${movieinfo['vote_average'].toFixed(1)} / 10`;

            tempMovieData = {
                'id': card.id,
                'title': title,
                'overview': overview,
                'poster_path': `https://image.tmdb.org/t/p/w500${movieinfo['poster_path']}`,
                'vote_average': movieinfo['vote_average']
            }

            modalImg.src = `https://image.tmdb.org/t/p/w500${movieinfo['backdrop_path']}`;
            modalTitle.innerHTML = title;
            modalContents.innerHTML = overview;
            modalVoteAverage.innerHTML = voteAverage;
        }
    })
});

modalClose.addEventListener("click", CloseModal);

bookmarkBtn.addEventListener("click", async function () {
    if (bookmarkBtn.dataset.isclicked === "false") {
        bookmarkBtn.dataset.isclicked = "true";
        let rows = [];
        let JsonData = JSON.parse(localStorage.getItem('bookmarks'));
        if (JsonData) {
            for (let i = 0; i < JsonData.length; ++i) {
                let col = { 'id': JsonData[i][0], ...JsonData[i][1] };
                rows.push(col)
            }
        }
        MakePosters(rows);
    }
    else {
        bookmarkBtn.dataset.isclicked = "false";
        url = `https://api.themoviedb.org/3/movie/popular?language=ko&page=1`
        const rows = await getMovieData();
        MakePosters(rows);
    }
});

addBookmark.addEventListener("click", function () {
    const { id, ...rest } = tempMovieData;
    let savedMovieDatas = LoadSavedDatas();

    if (savedMovieDatas.has(id)) {
        savedMovieDatas.delete(id);

        if (bookmarkBtn.dataset.isclicked === "true") {
            let rows = [];
            savedMovieDatas.forEach((value, key) => {
                let col = { 'id': key, ...value };
                rows.push(col);
            })

            MakePosters(rows);
            CloseModal();
        }

        addBookmark.innerHTML = "북마크 추가";
        alert("북마크가 해제되었습니다.")
    }
    else {
        savedMovieDatas.set(id, rest);
        addBookmark.innerHTML = "북마크 해제";
        alert("북마크가 추가되었습니다.");
    }

    let bookmarkString = JSON.stringify([...savedMovieDatas]);
    localStorage.setItem("bookmarks", bookmarkString);
})
