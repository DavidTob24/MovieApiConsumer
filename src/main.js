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

const getTrendingTvPReview = async () =>{
    const res = await fetch('https://api.themoviedb.org/3/trending/tv/day?api_key='+ API_KEY);

    const data = await res.json()
    const tvShows = data.results;

    console.log(data,tvShows)

    const trendingTvshowsContainer = document.querySelector('.trending-cards-TV')

    tvShows.forEach(TvShow => {
        const tvShContainer = document.createElement('div')
        tvShContainer.classList.add('tv-show-item')

        const tvShowImg = document.createElement('img')
        tvShowImg.classList.add('trending-tvS-img')
        tvShowImg.setAttribute('alt',TvShow.name);
        tvShowImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + TvShow.poster_path);

        tvShContainer.appendChild(tvShowImg);
        trendingTvshowsContainer.appendChild(tvShContainer)

    })

}

getTrendingTvPReview()

let currentImageIndex = 0;
let movies = [];

const changeBackgroundImage = async () => {
    const mainSection = document.querySelector('.main-section');
    const currentGradient = 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1))';

    // Si no tenemos películas, las obtenemos
    if (movies.length === 0) {
        try {
            const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
            const data = await res.json();
            movies = data.results.filter(movie => movie.backdrop_path);
        } catch (error) {
            console.error("Error fetching movies:", error);
            return;
        }
    }

    // Seleccionamos la película actual
    const currentMovie = movies[currentImageIndex];

    // Construimos la URL de la imagen
    const newImageUrl = `https://image.tmdb.org/t/p/original${currentMovie.poster_path}`;

    // Actualizamos el fondo
    mainSection.style.backgroundImage = `${currentGradient}, url('${newImageUrl}')`;

    // Incrementamos el índice para la próxima vez
    currentImageIndex = (currentImageIndex + 1) % movies.length;
}

const startBackgroundImageRotation = () => {
    // Cambiamos la imagen inmediatamente
    changeBackgroundImage();

    // Configuramos el intervalo para cambiar la imagen cada 3 segundos
    setInterval(changeBackgroundImage, 12000);
}

// Iniciamos la rotación de imágenes cuando se carga el DOM
document.addEventListener('DOMContentLoaded', startBackgroundImageRotation);