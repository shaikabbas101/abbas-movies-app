import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import dateFormat from 'dateformat'
import {StyleRoot} from 'radium'
import Header from '../Header'
import SimilarMovies from '../SimilarMovies'

import './index.css'

class HomeMovies extends Component {
  state = {uniqueMovieDetails: [], similarMovies: [], newId: 0, isLoading: true}

  componentDidMount() {
    this.getUniqueMovie()
    this.getSimilarMovies()
  }

  getFormattedData = data => ({
    adult: data.adult,
    backdropPath: data.backdrop_path,
    belongsToCollection: data.belongs_to_collection,
    budget: data.budget,
    genres: data.genres,
    homepage: data.homepage,
    id: data.id,
    imdbId: data.imdb_id,
    originalLanguage: data.original_language,
    originalTitle: data.original_title,
    overview: data.overview,
    popularity: data.popularity,
    posterPath: data.poster_path,
    productionCompanies: data.production_companies,
    productionCountries: data.production_countries,
    releaseDate: data.release_date,
    revenue: data.revenue,
    runtime: data.runtime,
    spokenLanguages: data.spoken_languages,
    status: data.status,
    tagline: data.tagline,
    title: data.title,
    video: data.video,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
  })

  getSimilarMovieFormattedDat = data =>
    data.results.map(movie => ({
      adult: movie.adult,
      backdropPath: movie.backdrop_path,
      genreIds: movie.genre_ids,
      id: movie.id,
      mediaType: movie.media_type,
      originalLanguage: movie.original_language,
      originalTitle: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      title: movie.title,
      video: movie.video,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
    }))

  getUniqueMovie = async () => {
    const {newId} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    const updateId = newId === 0 ? id : newId
    const url = `https://api.themoviedb.org/3/movie/${updateId}?api_key=a709ef5cf669a418dea9126a1637e743&language=en-US`

    const response = await fetch(url)
    const data = await response.json()
    const formattedData = this.getFormattedData(data)
    this.setState({uniqueMovieDetails: formattedData, newId: id})
  }

  getSimilarMovies = async () => {
    const {newId} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    const updateId = newId === 0 ? id : newId
    const url = `https://api.themoviedb.org/3/movie/${updateId}/similar?api_key=a709ef5cf669a418dea9126a1637e743&language=en-US&page=1`
    const response = await fetch(url)
    const data = await response.json()
    const formattedData = this.getSimilarMovieFormattedDat(data)
    this.setState({
      similarMovies: formattedData,
      isLoading: false,
      newId: id,
    })
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#D81F26" height="50" />
    </div>
  )

  changeMovieId = idVal => {
    this.setState({newId: idVal}, this.getUniqueMovie)
    this.setState({newId: idVal}, this.getSimilarMovies)
  }

  renderMostLikeThisMovies = () => {
    const {similarMovies} = this.state
    return (
      <>
        <h1 className="side-heading">Most Liked this</h1>
        <div className="similar-movies-container pt-3 pb-5">
          {similarMovies.map(eachMovie => (
            <SimilarMovies
              similarMovieDetails={eachMovie}
              updateId={this.changeMovieId}
              key={eachMovie.id}
            />
          ))}
        </div>
      </>
    )
  }

  renderHomeMoviesPage = () => {
    const {uniqueMovieDetails} = this.state
    const {
      backdropPath,
      posterPath,
      releaseDate,
      homepage,
      runtime,
      title,
      adult,
      overview,
      genres,
      spokenLanguages,
      voteAverage,
      voteCount,
      budget,
    } = uniqueMovieDetails
    const imgUrl1 = `https://image.tmdb.org/t/p/original/${posterPath}`
    const imgUrl2 = `https://image.tmdb.org/t/p/original/${backdropPath}`
    const myStyle = {
      backgroundImage: `url(${imgUrl1})`,
      backgroundSize: 'cover',
      minHeight: '100vh',
      '@media (min-width: 768px)': {
        backgroundImage: `url(${imgUrl2})`,
      },
    }
    return (
      <>
        <StyleRoot>
          <div style={myStyle}>
            <Header />
            <div className="container">
              <h1 className="text-white movie-heading">{title}</h1>
              <div className="movie-time-type-year-container">
                <p className="text-white">
                  {Math.floor(runtime / 60)}hr {Math.floor(runtime % 60)} min
                </p>
                {adult ? (
                  <p className="text-white">A</p>
                ) : (
                  <p className="text-white movie-certification">UA</p>
                )}
                <p className="text-white">{releaseDate.slice(0, 4)}</p>
              </div>
              <p className="movie-description">{overview}</p>
              <Link to={homepage}>
                <button type="button" className="btn btn-light mt-2 mb-3">
                  Play
                </button>
              </Link>
            </div>
          </div>
        </StyleRoot>
        <div className="movie-details-and-most-liked-bg-container">
          <div className="container">
            <div className="movie-details-container pt-4">
              <div className="genres-container">
                <p className="type-heading">Genres</p>
                <div>
                  {genres.map(genreData => (
                    <p className="type-name" key={genreData.id}>
                      {genreData.name}
                    </p>
                  ))}
                </div>
              </div>

              <div className="audio-available-container">
                <p className="type-heading">Audio Available</p>
                <div>
                  {spokenLanguages.map(audioData => (
                    <p className="type-name">{audioData.english_name}</p>
                  ))}
                </div>
              </div>

              <div className="rating-count-and-average-container">
                <p className="type-heading">Rating Count</p>
                <p className="type-name">{voteCount}</p>
                <p className="type-heading">Rating Average</p>
                <p className="type-name">{voteAverage}</p>
              </div>
              <div className="rating-count-and-average-container">
                <p className="type-heading">Budget</p>
                <p className="type-name">{budget}</p>
                <p className="type-heading">Release Date</p>
                <p className="type-name">
                  {dateFormat(releaseDate, 'dS mmmm yyyy')}
                </p>
              </div>
            </div>
            <div>{this.renderMostLikeThisMovies()}</div>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>{isLoading ? this.renderLoader() : this.renderHomeMoviesPage()}</div>
    )
  }
}

export default HomeMovies
