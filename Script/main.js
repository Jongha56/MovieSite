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

fetch(url, options)
    .then(response => response.json())
    .then(response => {
        const rows = response['results'];
        const [width, height] = [320, 450];
        
        rows.forEach(e => {
            const title = e['title'];
            const overview = e['overview'];
            const posterPath = e['poster_path'];
            const voteAverage = e['vote_average'];
            const id = e['id'];

            const tempHtml = `
                <div class="movie-card" id="${id}" data-ismarked="No">
                    <img src="https://image.tmdb.org/t/p/w500${posterPath}" width="${width}" height="${height}">
                    <h3>${title}</h3>
                    <p>⭐ ${voteAverage.toFixed(1)} / 10</p>
                </div>
            `
            movieList.innerHTML += tempHtml;
        });
    })
    .catch(err => console.error(err));

searchInput.addEventListener("input", function () {
    const inputValue = searchInput.value.toLowerCase();
    const searchStr = inputValue.replace(' ', '+');

    url = searchStr === "" ? `https://api.themoviedb.org/3/movie/popular?language=ko&page=1` : `https://api.themoviedb.org/3/search/movie?query=${searchStr}&language=ko`;

    fetch(url, options)
    .then(response => response.json())
    .then(response => {
        const rows = response['results'];
        const [width, height] = [320, 450];
        
        movieList.innerHTML = "";
        movieList.style.color = 'black';

        rows.forEach(e => {
            const title = e['title'];
            const overview = e['overview'];
            const posterPath = e['poster_path'];
            const voteAverage = e['vote_average'];
            const id = e['id'];

            const tempHtml = `
                <div class="movie-card" id="${id}" data-ismarked="No">
                    <img src="https://image.tmdb.org/t/p/w500${posterPath}" width="${width}" height="${height}">
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
    })
    .catch(err => console.error(err));
});

movieList.addEventListener("click", function(e) {
    const movieCard = document.querySelectorAll('.movie-card');
    console.log(movieCard);
    movieCard.forEach(card => {
        if (e.target.parentNode.id === card.id) {
            document.querySelector(".background").className = "background show";
            document.body.style.setProperty('--scrollbar-width', `${window.innerWidth - document.documentElement.offsetWidth}px`); // 스크롤바 너비 만큼 화면 고정
            document.body.classList.add("overflow-hidden"); // 모달창 띄웠을 때 뒤의 화면 스크롤 방지

            url = `https://api.themoviedb.org/3/movie/${card.id}?language=ko`;

            fetch(url, options)
                .then(response => response.json())
                .then(response => {
                    const movieinfo = response;
                    const [width, height] = [320, 450];

                    const title = movieinfo['title'];
                    const overview = movieinfo['overview'];
                    const voteAverage = `⭐ ${movieinfo['vote_average'].toFixed(1)} / 10`;

                    if (e.target.parentNode.dataset.ismarked === "No") {
                        tempMovieData = {
                            'id': card.id,
                            'title': title,
                            'overview': overview,
                            'poster_path': `https://image.tmdb.org/t/p/w500${movieinfo['poster_path']}`,
                            'vote_average': voteAverage
                        }
                    }
                    else {
                        tempMovieData = {};
                    }

                    modalImg.src = `https://image.tmdb.org/t/p/w500${movieinfo['backdrop_path']}`;
                    // modalImg.width = width;
                    // modalImg.height = height;
                    modalTitle.innerHTML = title;
                    modalContents.innerHTML = overview;
                    modalVoteAverage.innerHTML = voteAverage;
                })
                .catch(err => console.error(err));
        }
    })
});

modalClose.addEventListener("click", function() {
    document.querySelector(".background").className = "background";
    document.body.classList.remove("overflow-hidden"); // 모달창 닫았을 때 뒤의 화면 스크롤바 속성 추가
})

bookmarkBtn.addEventListener("click", function() {

});

addBookmark.addEventListener("click", function(e) {
    // let {id, ...rest} = tempMovieData;
    // console.log(`tempMovieData: ${tempMovieData}, tmpDatas: ${tmpDatas}`);
    const tmpCard = document.getElementById(`${tempMovieData["id"]}`);
    if (tmpCard.dataset.ismarked === "No") {
        tmpCard.dataset.ismarked = "Yes";
        let bookmarkString = JSON.stringify(tempMovieData);
        localStorage.setItem("bookmarks", bookmarkString);
        // alert("")
    }
    else {
        tmpCard.dataset.ismarked = "No";
        localStorage.removeItem("bookmarks");
    }
})

const SaveMovieData = (data) => {
    let saveData = {};

    console.log(...data);

    return saveData;
}


