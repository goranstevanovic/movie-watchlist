const movieList = document.getElementById('movie-list');
const message = document.getElementById('message');

let movies = JSON.parse(localStorage.getItem('watchlist')) || [];

if (movies.length === 0) {
  message.textContent = 'Your watch list is currently empty';
} else {
  displayMovies(
    movies,
    'Remove from Watchlist',
    'remove',
    'Your watch list is currently empty'
  );

  function removeFromWatchlist(movieId) {
    movies = movies.filter((movie) => movie.imdbID !== movieId);
    localStorage.setItem('watchlist', JSON.stringify(movies));
  }

  function handleRemoveMovie(e) {
    if (!e.target.classList.contains('movie__button')) {
      return;
    }

    const movieId = e.target.dataset.id;

    removeFromWatchlist(movieId);

    displayMovies(
      movies,
      'Remove from Watchlist',
      'remove',
      'Your watch list is currently empty'
    );
  }

  movieList.addEventListener('click', handleRemoveMovie);
}
