const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjI3NDM3OTJmYTExMDlmZjliYzk3OTU0MmNhYmE0YiIsIm5iZiI6MTcyODk1NjI5MS44NjY2NzgsInN1YiI6IjY3MGRjM2M2MGI4MDA1MzdkNzVjYjRjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SujuOl1F-E-gei0PFevO6xn-fnLzj3ZISTWYeISBvkQ'
    }
};

fetch('https://api.themoviedb.org/3/movie/popular?language=ko&page=1', options)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        const rows = response['results'];
        const cardList = document.querySelector('#movie-list');
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
            cardList.innerHTML += tempHtml;
        });

        // console.log(rows);
    })
    .catch(err => console.error(err));

const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const bookmarkBtn = document.querySelector('#bookmark-btn');

searchInput.addEventListener("input", function () {
    const inputValue = searchInput.value.toLowerCase();
    const searchStr = inputValue.replace(' ', '+');
    console.log(searchStr);

    const url = searchStr === "" ? `https://api.themoviedb.org/3/movie/popular?language=ko&page=1` : `https://api.themoviedb.org/3/search/movie?query=${searchStr}&language=ko`;

    fetch(url, options)
    .then(response => response.json())
    .then(response => {
        const rows = response['results'];
        const cardList = document.querySelector('#movie-list');
        const [width, height] = [320, 450];
        
        cardList.innerHTML = "";
        cardList.style.color = 'black';

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
            cardList.innerHTML += tempHtml;
        });

        if (rows.length < 1) {
            cardList.style.color = 'white';
            cardList.innerHTML += `
            <div class="empty-movie">
                <p>관련 영화가 존재하지 않습니다.</p>
                <p>다시 검색해 주세요.</p> 
            </div>
            `;
        }
    })
    .catch(err => console.error(err));
});







