const movieList = document.getElementById('movie-list');

const movies = JSON.parse(localStorage.getItem('watchlist')) || [];

displayMovies(movies);
