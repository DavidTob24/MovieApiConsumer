const getTrendingMoviesPr = async () => {
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();
    const movies = data.results;

    console.log(data, movies);

    // Selecciona el contenedor existente de películas en tendencia
    const trendingMoviesContainer = document.querySelector('.trending-cards-movies');

    trendingMoviesContainer.innerHTML = ``;

    movies.forEach(movie => {
        // Crea un contenedor para cada película
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-item'); // Nueva clase para cada película

        const movieImg = document.createElement('img');
        movieImg.classList.add('trending-movieimg');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);


        // Agrega la imagen y el nombre al contenedor de la película
        movieContainer.appendChild(movieImg);


        // Agrega el contenedor de la película al contenedor principal
        trendingMoviesContainer.appendChild(movieContainer);
    });
}

getTrendingMoviesPr();