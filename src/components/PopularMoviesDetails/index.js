import './index.css'
import {Link} from 'react-router-dom'

const PopularMoviesDetails = props => {
  const {popularMovieDetails} = props
  const {posterPath, id, title} = popularMovieDetails

  return (
    <Link to={`/popular-movies/${id}`} target="_blank">
      <div className="mr-3">
        <img
          alt="popular_movies_image"
          src={`https://image.tmdb.org/t/p/original/${posterPath}`}
          className="popular-movie-img"
        />
        <p className="popular-movie-name pt-3">{title}</p>
      </div>
    </Link>
  )
}
export default PopularMoviesDetails
