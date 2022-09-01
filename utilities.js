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
