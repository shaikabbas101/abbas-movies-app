import './index.css'
import {Link} from 'react-router-dom'

const SimilarMovies = props => {
  const {similarMovieDetails} = props
  const {posterPath, id, title} = similarMovieDetails

  return (
    <Link to={`/similar/${id}`} target="_blank">
      <div className="mr-3">
        <img
          alt="similar_movies_image"
          src={`https://image.tmdb.org/t/p/original/${posterPath}`}
          className="similar-movie-img"
        />
        <p className="similar-movie-name pt-3">{title}</p>
      </div>
    </Link>
  )
}
export default SimilarMovies
