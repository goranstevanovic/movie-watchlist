const movieList = document.getElementById('movie-list');

let movies = JSON.parse(localStorage.getItem('watchlist')) || [];

displayMovies(movies, 'Remove from Watchlist');

function removeFromWatchlist(movieId) {
  movies = movies.filter((movie) => movie.imdbID !== movieId);
}

function handleRemoveMovie(e) {
  if (!e.target.classList.contains('movie__button')) {
    return;
  }

  const movieId = e.target.dataset.id;

  removeFromWatchlist(movieId);

  displayMovies(movies, 'Remove from Watchlist');
}

movieList.addEventListener('click', handleRemoveMovie);
