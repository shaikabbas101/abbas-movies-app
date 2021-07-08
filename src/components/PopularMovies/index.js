import {Component} from 'react'
import Loader from 'react-loader-spinner'
import PopularMoviesDetails from '../PopularMoviesDetails'
import FooterSection from '../FooterSection'
import Header from '../Header'
import './index.css'

class PopularMovies extends Component {
  state = {
    isLoading: true,
    popularMovies: [],
    pageNo: 1,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getFormattedData = data =>
    data.results.map(movie => ({
      adult: movie.adult,
      backdropPath: movie.backdrop_path,
      genreIds: movie.genre_ids,
      id: movie.id,
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

  getPopularMovies = async () => {
    const {pageNo} = this.state
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=a709ef5cf669a418dea9126a1637e743&language=en-US&page=${pageNo}`
    const response = await fetch(url)
    const data = await response.json()
    const formattedData = this.getFormattedData(data)
    this.setState({
      popularMovies: formattedData,
      isLoading: false,
    })
  }

  onIncrease = () => {
    const {pageNo} = this.state
    if (pageNo < 25) {
      this.setState(prevState => ({
        pageNo: prevState.pageNo + 1,
        isLoading: true,
      }))
      this.getPopularMovies()
    }
  }

  onDecrease = () => {
    const {pageNo} = this.state
    if (pageNo > 1) {
      this.setState(prevState => ({
        pageNo: prevState.pageNo - 1,
        isLoading: true,
      }))
      this.getPopularMovies()
    }
  }

  renderPopularMovies = () => {
    const {popularMovies, pageNo} = this.state
    return (
      <div className="popular-page-bg-container">
        <Header />
        <div className="container">
          <div className="popular-movie-details-container">
            {popularMovies.map(eachMovie => (
              <PopularMoviesDetails
                popularMovieDetails={eachMovie}
                key={eachMovie.id}
              />
            ))}
          </div>
          <div className="page-scroll-container pb-5">
            <button
              type="button"
              className="chevron-container chevron-left"
              onClick={this.onDecrease}
            >
              <i className="fas fa-chevron-left chevron"> </i>
            </button>

            <p className="text-white pt-2">{pageNo} of 20</p>

            <button
              type="button"
              className="chevron-container chevron-right"
              onClick={this.onIncrease}
            >
              <i className="fas fa-chevron-right chevron"> </i>
            </button>
          </div>
        </div>
        <FooterSection />
      </div>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#D81F26" height="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div>{isLoading ? this.renderLoader() : this.renderPopularMovies()}</div>
    )
  }
}

export default PopularMovies
