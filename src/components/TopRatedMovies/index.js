import {Link} from 'react-router-dom'
import './index.css'

const TopRatedMovies = props => {
  const {movieDetails} = props
  const {posterPath, id, title} = movieDetails
  return (
    <Link to={`/home-movies/top-rated/${id}`}>
      <div>
        <img
          alt="top_rated_movies"
          src={`https://image.tmdb.org/t/p/original/${posterPath}`}
          className="top-rated-movie-img"
        />
        <p className="movie-name pt-3">{title}</p>
      </div>
    </Link>
  )
}
export default TopRatedMovies
