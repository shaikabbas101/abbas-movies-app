import {Link} from 'react-router-dom'
import './index.css'

const TrendingMovies = props => {
  const {movieDetails} = props
  const {posterPath, id, title} = movieDetails
  return (
    <Link to={`/home-movies/trending/${id}`}>
      <div>
        <img
          alt="trending_movies_image"
          src={`https://image.tmdb.org/t/p/original/${posterPath}`}
          className="trending-movie-img"
        />
        <p className="movie-name pt-3">{title}</p>
      </div>
    </Link>
  )
}
export default TrendingMovies
