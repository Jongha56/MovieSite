const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjI3NDM3OTJmYTExMDlmZjliYzk3OTU0MmNhYmE0YiIsIm5iZiI6MTcyODk1NjI5MS44NjY2NzgsInN1YiI6IjY3MGRjM2M2MGI4MDA1MzdkNzVjYjRjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SujuOl1F-E-gei0PFevO6xn-fnLzj3ZISTWYeISBvkQ'
    }
};

async function getMovieData(url) {
    try {
        const movieData = await fetch(url, options);
        const jsonData = await movieData.json();
        const results = Object.keys(jsonData).includes('results') ? jsonData.results : jsonData;

        return results;
    } catch (err) {
        throw (err);
    }
}

export { getMovieData }
