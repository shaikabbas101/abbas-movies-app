import './index.css'
import {Link} from 'react-router-dom'

const OriginalsMovies = props => {
  const {movieDetails} = props
  const {posterPath, id, name} = movieDetails
  return (
    <Link to={`/home-movies/originals/${id}`}>
      <div>
        <img
          alt="originals_movies_image"
          src={`https://image.tmdb.org/t/p/original/${posterPath}`}
          className="originals-movie-img"
        />
        <p className="movie-name pt-3">{name}</p>
      </div>
    </Link>
  )
}
export default OriginalsMovies
