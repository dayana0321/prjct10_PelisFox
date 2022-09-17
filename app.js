const apiKey = 'api_key=0c39c4186be932ad3e363ee8bd157c94';
const baseURL = 'https://api.themoviedb.org/3';
const apiURL= baseURL+'/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&'+apiKey;
const imgURL = 'https://image.tmdb.org/t/p/w500'
const main = document.getElementById('main');
const search = document.getElementById('search');
const searchURL = baseURL+'/search/movie?'+apiKey;
const tagsEl = document.querySelectorAll('.dropdown-item');
const genderURL = baseURL+'/genre/movie/list?'+apiKey+'&language=en-US';
const seriesURL = baseURL+'/discover/tv?'+apiKey+'&sort_by=popularity.desc&page=1&include_null_first_air_dates=false&with_status=0&with_type=0';
const movieGenderURL = baseURL+
getMoviesC(apiURL)
getMovies(apiURL)
getGender(genderURL)
getMovieGender()
getSeries(seriesURL);

function getMovies(url){
    peli = document.getElementById('pelis');
    peli.addEventListener('click', ()=>{
        fetch(url).then(res => res.json()).then(data =>{
            console.log(data.results);
            showMovies(data.results);
        })
    }) 
}

function getMoviesC(url){
        fetch(url).then(res => res.json()).then(data =>{
            console.log(data.results);
            showMovies(data.results);
        })
}

//Generos de películas
function getGender(url){
    console.log('Entró al cargar género')
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data.genres);
        setGender(data)
    })
}

function getSeries(url){
    console.log('Entró al cargar series')
    serie = document.getElementById('series');
    serie.addEventListener('click', ()=>{
        fetch(url).then(res => res.json()).then(data =>{
            console.log(data.results);
            showSeries(data.results);
        })
    })
}

function setGender(data){
    let gender = document.getElementById('genders').options;
    for(let i = 0; i < data.genres.length; i++){
        gender.add(new Option(data.genres[i].name, data.genres[i].id));
    }
}

function getMovieGender(){
     let gender = document.getElementById('genders');
     console.log(gender)
     gender.addEventListener('click', ()=>{
            console.log('Hola'+ gender.value);
            let movieGenURL =fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=0c39c4186be932ad3e363ee8bd157c94&with_genres=${gender.value}`).then(res => res.json()).then(data=>{
            console.log(data.results);
            showMovies(data.results);
        });
    })
}   

function showMovies(data){
    main.innerHTML = '';
    data.forEach(movie => {
        //Destructuracion
        const {title, poster_path, vote_average,release_date,overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <div class="card">
                 <img src = "${imgURL+poster_path}" alt ="${title}" class="card-img-top">
                <div class="card-body movie-info">
                    <h3 class="card-title">${title}</h3>
                    <span class="${getColor(vote_average)}">${vote_average}</span>
                    <br>
                    <span class="card-text">${release_date}</span>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    ${overview};
                </div>
            </div>
        `
        main.appendChild(movieEl);
    });
}

//Mostrar series
function showSeries(data){
    main.innerHTML = '';
    data.forEach(movie => {
        //Destructuracion
        const {name, poster_path, vote_average,first_air_date,overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <div class="card">
                 <img src = "${imgURL+poster_path}" alt ="${name}" class="card-img-top">
                <div class="card-body movie-info">
                    <h3 class="card-title">${name}</h3>
                    <span class="${getColor(vote_average)}">${vote_average}</span>
                    <br>
                    <span class="card-text">${first_air_date}</span>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    ${overview};
                </div>
            </div>
        `
        main.appendChild(movieEl);
    });
}





function getColor(vote){
    if(vote >= 8){
        return 'green';
    }else if(vote >= 5){
        return 'orange';
    }else{
        return 'red';
    }
}

//Buscar película
form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchMovie = search.value;
    if(searchMovie){
        getMovies(searchURL+'&query='+searchMovie);
        getMoviesC(searchURL+'&query='+searchMovie);
    }else{
        getMovies(apiURL);
        getMoviesC(apiURL);
    }
});