const btn = document.getElementById("button")
const movieSec = document.getElementById("movie-section")
const emptySec = document.getElementById("empty-container")
const input = document.getElementById("input")
let search = ""
let movies = []
let moviesDetail = []
let watchList = []

async function getMovies(search){
    const res = await fetch(`https://www.omdbapi.com/?apikey=8de58c3&s=${search}`)
    const data = await res.json()
    movies = []
    moviesDetail = []
    if (data["Search"] === undefined){
        renderError()
        return
    }
    for (let i=0; i<Math.min(data["Search"].length, 10); i++){
        movies.push(data["Search"][i].imdbID)
    }
    
    // forEach wont wait for async
    for (let movie of movies){
        const res = await fetch(`https://www.omdbapi.com/?apikey=8de58c3&i=${movie}`)
        const data = await res.json()
        moviesDetail.push(data)
    }
    renderMovies()  
}


function addToWatch(movieID) {
    const movie = moviesDetail.filter((movie)=>{
        return movie.imdbID===movieID
    })[0]
    if (!watchList.includes(movie))
        watchList.push(movie)
    localStorage.setItem("watchlist", JSON.stringify(watchList))
    console.log('Added:', movie.Title); 
}

function renderMovies(){
    if (!emptySec.classList.contains("hidden")) {
        emptySec.classList.toggle("hidden")
        movieSec.classList.toggle("hidden")
    }
    movieSec.innerHTML = moviesDetail.map((movie)=>{
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
                        <div class="plus" data-add="${movie["imdbID"]}">+</div>
                        <div data-add="${movie["imdbID"]}">Watchlist</div>
                    </button>
                </div>
                <p>${movie["Plot"]}</p>
            </div>
        </div>
        `
    }).join("")
}


function renderError(){
    if (emptySec.classList.contains("hidden")) {
        emptySec.classList.toggle("hidden")
        movieSec.classList.toggle("hidden")
    }
    emptySec.innerHTML = `
        <section>
            <p>Unable to find what you're looking for. Please try another search.</p>
        </section>
    `       
}

function renderStart(){
    if (emptySec.classList.contains("hidden")) {
        emptySec.classList.toggle("hidden")
        movieSec.classList.toggle("hidden")
    }
    emptySec.innerHTML = `
        <section>
            <img src="images/icon.png">
            <p>Start exploring</p>
        </section>
    `
}

// Add event listeners
btn.addEventListener("click", ()=>{
    console.log("ex")
    getMovies(input.value)
    input.value = ""
})


document.addEventListener("click", (e)=>{
    if (e.target.dataset.add){
        console.log(e.target.dataset.add)
        addToWatch(e.target.dataset.add)
    }
})
