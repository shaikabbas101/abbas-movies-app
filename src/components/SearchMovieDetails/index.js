import './index.css'
import {Link} from 'react-router-dom'

const SearchMovieDetails = props => {
  const {movieDetails} = props
  const {posterPath, id, title} = movieDetails

  return (
    <Link to={`/search-movies/${id}`} target="_blank">
      <li>
        <img
          alt="search_movies_image"
          src={`https://image.tmdb.org/t/p/original/${posterPath}`}
          className="search-movie-img"
        />
        <p className="search-movie-name pt-3">{title}</p>
      </li>
    </Link>
  )
}
export default SearchMovieDetails
