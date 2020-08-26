const apiKey = 'a9d8f18d1eafc6f65b95676714dcdaff';

function MovieCard(props) {
  const movie = props.movie;

  return (
    <div className="card">
      <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} className="card__image" title={movie.title} alt={movie.title + ' poster'}/>
      <div className="card__content">
        <h3 className="card__title">{movie.title}</h3>
        <p><small>RELEASE DATE: {movie.release_date}</small></p>
        <p><small>RATING: {movie.vote_average}</small></p>
        <p className="card__desc">{movie.overview}</p>
      </div>
    </div>
  )

}

function SearchMovies() {

  //states- input query, movies
  const [query, setQuery] = React.useState('');
  //create the state for movies, and update that state when appropriate
  const [movies, setMovies] = React.useState([]);


  const searchMovies = async () => {
    if (query) {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
      try {
        const res = await fetch(url);
        const data = await res.json();
        // set the state `movies`
        setMovies(data.results);
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <div>
      <form className="form" onSubmit={(e) => {
        e.preventDefault();
        searchMovies();
      }}>
        <label htmlFor="query" className="label">Search movies</label>
        <input type="text" className="input" id="query" name="query" placeholder="e.g. Lion King"
        value={query} onChange={(e) => {
          setQuery(e.target.value);
        }} required autoFocus/>
        <button type="submit" className="button">Search</button>
      </form>
      <div className="card-list">
        {
        
        movies
        .filter(movie => movie.poster_path)
        .map(movie => <MovieCard key={movie.id} movie={movie}/>)

        }
      </div>
    </div>

  )

}