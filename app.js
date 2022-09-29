'use strict';

const API_KEY = 'c1df19cf';
const URL = `https://www.omdbapi.com/?apikey=${API_KEY}&`;

const searchLoadingMessage = 'Searching for movies...';
const searchErrorMessage =
  'There was a problem with a search. Please try again.';
const noMovieFoundMessage = 'No movies were found.';

const movieNameEl = document.getElementById('movie-name');
const searchFormEl = document.getElementById('search-form');
const messageEl = document.getElementById('message');
const movieList = document.getElementById('movie-list');

async function searchMovies(movieName) {
  try {
    const res = await fetch(`${URL}s=${movieName}&type=movie`);
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
}

async function getMovie(movieId) {
  const res = await fetch(`${URL}i=${movieId}`);
  const data = await res.json();
  return data;
}

async function getMovies(moviesIds) {
  const movies = [];

  for await (const movieId of moviesIds) {
    const movie = await getMovie(movieId);
    movies.push(movie);
  }

  return movies;
}

function addToWatchlist(movie) {
  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

  const watchlistIncludesMovie = watchlist.some(
    (savedMovie) => savedMovie.imdbID === movie.imdbID
  );

  if (watchlistIncludesMovie) {
    console.log('movie already added');
    return;
  }

  console.log(watchlist);
  watchlist.push(movie);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
}

async function handleFormSubmit(e) {
  e.preventDefault();

  messageEl.textContent = searchLoadingMessage;

  let data = null;

  try {
    data = await searchMovies(movieNameEl.value.trim().toLowerCase());
  } catch (e) {
    movieList.innerHTML = `
      <p id="message" class="movie-list__text">
        ${searchErrorMessage}
      </p>
    `;
    return;
  }

  // if (data === undefined) {
  //   movieList.innerHTML = `
  //     <p id="message" class="movie-list__text">
  //       ${searchErrorMessage}
  //     </p>
  //   `;
  //   return;
  // }

  if (data.Error) {
    movieList.innerHTML = `
      <p id="message" class="movie-list__text">
        ${noMovieFoundMessage}
      </p>
    `;
    return;
  }

  const moviesIds = data.Search.map((movie) => movie.imdbID);
  const movies = await getMovies(moviesIds);

  displayMovies(movies, 'Add to Watchlist', 'add');
}

async function handleAddMovie(e) {
  if (!e.target.classList.contains('movie__button')) {
    return;
  }

  const movieId = e.target.dataset.id;
  const movie = await getMovie(movieId);
  addToWatchlist(movie);
}

searchFormEl.addEventListener('submit', handleFormSubmit);

movieList.addEventListener('click', handleAddMovie);
