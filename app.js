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
    this.movies[index].watched = !this.movies[index].watched
  },
  removeMovie(index) {
    this.movies.splice(index, 1)
  }
}

function saveMovies() {
  // TODO (Step 6)
  localStorage.setItem("movies",
    JSON.stringify(watchlist.movies))
}

function loadMovies() {
  // TODO (Step 6)\
  const saved = localStorage.getItem("movies")

  if (saved === null){
    return
  }
  try {
    watchlist.movies = JSON.parse(saved)
  } catch (e){
    watchlist.movies = []
  }
}



form.addEventListener("submit", (event) => {
  // TODO (Step 5)
  event.preventDefault()
  let movieTitle = titleInput.value.trim()
  let movieGenre = genreSelect.value
  if (movieTitle === ""){
    message.textContent = "Enter a movie"
    return
  }
  if (movieGenre === ""){
    message.textContent = "choose a genre"
    return
  }

  watchlist.movies.push({
    title: movieTitle,
    genre: movieGenre,
    watched: false
  })

  saveMovies()
  renderMovies()

  message.textContent = ""
  titleInput.value = ""
});

loadMovies();
renderMovies();