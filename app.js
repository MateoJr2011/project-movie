const form = document.getElementById("movie-form");
const titleInput = document.getElementById("movie-title");
const genreSelect = document.getElementById("movie-genre");
const message = document.getElementById("form-message");
const movieList = document.getElementById("movie-list");




function renderMovies() {
  movieList.replaceChildren();
  
  if (watchlist.movies.length === 0) {
    const emptyMessage = document.createElement("p")
    emptyMessage.textContent = "no movies in your list!"
    movieList.appendChild(emptyMessage)
    return
  }
  watchlist.movies.forEach((movie, index) => {
    const card = document.createElement("li");
    const title = document.createElement("h3");
    title.textContent = movie.title;

    const details = document.createElement("p");

    details.textContent = `${movie.genre} - ${movie.watched ? "watched" : "not watched"}`

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";

    toggleButton.textContent = movie.watched ? "mark unwatched" : "mark watched"
    toggleButton.addEventListener("click", () => {
      watchlist.toggleWatched(index);
      saveMovies();
      renderMovies();
    });

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      watchlist.removeMovie(index);
      saveMovies();
      renderMovies();
    });

    card.append(title, details, toggleButton, removeButton);
    movieList.append(card);
  });


}
const watchlist = {
  movies: [{
    title: "9",
    genre: "Horror",
    watched: false
}],
  toggleWatched(index) {
    // TODO (Step 4)
  },
  removeMovie(index) {
    // TODO (Step 4)
  }
}

function saveMovies() {
  // TODO (Step 6)
}

function loadMovies() {
  // TODO (Step 6)
}



// form.addEventListener("submit", (event) => {
//   // TODO (Step 5)
// });

loadMovies();
renderMovies();