'use strict';

const API_KEY = 'c1df19cf';
const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;

const movieNameEl = document.getElementById('movie-name');
const searchFormEl = document.getElementById('search-form');
const movieList = document.getElementById('movie-list');

async function searchMovies(movieName) {
  const res = await fetch(`${URL}s=${movieName}&type=movie`);
  const data = await res.json();
  return data;
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

function displayMovies(movies) {
  const movieEls = movies.map((movie) => {
    return `
      <article class="movie">
        <h2 class="movie__title">
          ${movie.Title}
        </h2>
        <div class="movie__header">
          <img
            src="${movie.Poster}"
            alt="${movie.Title}"
            class="movie__poster"
            width="164"
          />
          <div class="movie__meta">
            <div class="movie__scores">
              <p class="movie__imdb-score">${movie.imdbRating}</p>
              <p class="movie__metascore">${movie.Metascore}</p>
            </div>
            <p class="movie__duration">
              <span>Duration:</span>
              ${movie.Runtime}
            </p>
            <p class="movie__release-date">
              <span>Release Date:</span>
              ${movie.Released}
            </p>
            <p class="movie__genres">
              <span>Genres:</span>
              ${movie.Genre}
            </p>
          </div>
        </div>
        <p class="movie__director">
          <span>Director:</span>
          ${movie.Director}
        </p>
        <p class="movie__actors">
          <span>Actors:</span>
          ${movie.Actors}
        </p>
        <p class="movie__plot">
          ${movie.Plot}
        </p>
        <button class="movie__button" data-id="${movie.imdbID}">Add to Watchlist</button>
      </article>
    `;
  });

  movieList.innerHTML = movieEls;
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

  const data = await searchMovies(movieNameEl.value.trim().toLowerCase());
  const moviesIds = data.Search.map((movie) => movie.imdbID);
  const movies = await getMovies(moviesIds);

  displayMovies(movies);
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
