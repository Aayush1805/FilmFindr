let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//data from API
let getMovie = () => {
    let movieName = movieNameRef.value.trim(); // Trims whitespace
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    // if no movie name entered by user
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
    } else {
        result.innerHTML = `<h3 class="msg">Loading...</h3>`; // Loading message

        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                // movie exists in DB
                if (data.Response === "True") {
                    result.innerHTML = `
                    <div class="info">
                        <img src="${data.Poster !== "N/A" ? data.Poster : "placeholder.jpg"}" class="poster" alt="Movie Poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg" alt="Rating star">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                    `;
                } else {
                    // movie doesn't exist in DB
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                }
            })
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
            });
    }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
