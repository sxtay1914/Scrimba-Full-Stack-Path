const movieSec = document.getElementById("movie-section")
const emptySec = document.getElementById("empty-container")
let movieList = []
function renderMovie() {
    if (!emptySec.classList.contains("hidden")) {
        emptySec.classList.toggle("hidden")
        movieSec.classList.toggle("hidden")
    }
    movieList = JSON.parse(localStorage.getItem("watchlist")) || []
    movieSec.innerHTML = movieList.map((movie)=>{
        return `
        <div class="movie-container">
            <img src="${movie["Poster"]}">
            <div>
                <div class="title-sec">
                    <h2>${movie["Title"]}</h2>
                    <span class="rating">⭐${movie["Ratings"][0]["Value"]}</span>
                </div>
                <div class="middle-sec">
                    <div>${movie["Runtime"]}</div>
                    <div>${movie["Genre"]}</div>
                    <button data-add="${movie["imdbID"]}" class="watchlist-container">
                        <div class="plus" data-add="${movie["imdbID"]}">-</div>
                        <div data-add="${movie["imdbID"]}">Remove</div>
                    </button>
                </div>
                <p>${movie["Plot"]}</p>
            </div>
        </div>
        `
    }).join("")
}

function removeMovie(movieID){
    movieList = movieList.filter((movie)=>{
        return movie.imdbID!=movieID
    })
    localStorage.setItem("watchlist", JSON.stringify(movieList))
}

document.addEventListener("click", function(e){
    if (e.target.dataset.add){
        removeMovie(e.target.dataset.add)
        renderMovie()
    }
})

renderMovie()