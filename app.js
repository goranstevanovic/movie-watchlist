'use strict';

const API_KEY = 'c1df19cf';
const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;

const movieNameEl = document.getElementById('movie-name');
const searchFormEl = document.getElementById('search-form');

async function getMovies(movieName) {
  const res = await fetch(`${URL}s=${movieName}&type=movie`);
  const data = await res.json();
  return data;
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const data = await getMovies(movieNameEl.value);

  console.log(data);
}

searchFormEl.addEventListener('submit', handleFormSubmit);
