const searchInput = document.querySelector('#search-input');
const bookmarkBtn = document.querySelector('#bookmark-btn');
const movieList = document.querySelector('#movie-list');
const movieDetail = document.querySelector('#movie-detail');

const modalClose = document.querySelector('#modal-close');
const modalImg = document.querySelector('#modal-img');
const modalTitle = document.querySelector('#modal-title');
const modalContents = document.querySelector('#modal-contents');
const modalVoteAverage = document.querySelector('#modal-vote-average');

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
                <div class="movie-card" id="${id}">
                    <img src="https://image.tmdb.org/t/p/w500${posterPath}" width="${width}" height="${height}">
                    <h3>${title}</h3>
                    <p>평점: ${voteAverage}</p>
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
                <div class="movie-card" id="${id}">
                    <img src="https://image.tmdb.org/t/p/w500${posterPath}" width="${width}" height="${height}">
                    <h3>${title}</h3>
                    <p>평점: ${voteAverage}</p>
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
    movieCard.forEach(card => {
        if (e.target.parentNode.id === card.id) {
            document.querySelector(".background").className = "background show";

            url = `https://api.themoviedb.org/3/movie/${card.id}?language=ko`;
            console.log(card.id);

            fetch(url, options)
                .then(response => response.json())
                .then(response => {
                    const movieinfo = response;
                    console.log(response);
                    const [width, height] = [320, 450];

                    modalImg.src = `https://image.tmdb.org/t/p/w500${movieinfo['poster_path']}`;
                    // modalImg.width = width;
                    // modalImg.height = height;
                    modalTitle.innerHTML = movieinfo['title'];
                    modalContents.innerHTML = movieinfo['overview'];
                    modalVoteAverage.innerHTML = "평점 :" + movieinfo['vote_average'];
                    console.log(movieinfo);
                })
                .catch(err => console.error(err));
        }
    })
})

modalClose.addEventListener("click", function() {
    document.querySelector(".background").className = "background";
})




