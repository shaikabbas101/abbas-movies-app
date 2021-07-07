import {Component} from 'react'
import Loader from 'react-loader-spinner'
import HeaderWithSearch from '../HeaderWithSearch'
import './index.css'
import SearchMovieDetails from '../SearchMovieDetails'

class HomeSearch extends Component {
  state = {
    isLoading: true,
    searchMovies: [],
    searchInput: '',
    pageNo: 1,
  }

  componentDidMount() {
    this.getSearchMovies()
  }

  getFormattedData = data =>
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

  onIncrease = () => {
    const {pageNo} = this.state
    if (pageNo < 25) {
      this.setState(prevState => ({
        pageNo: prevState.pageNo + 1,
        isLoading: true,
      }))
      this.getSearchMovies()
    }
  }

  onDecrease = () => {
    const {pageNo} = this.state
    if (pageNo > 1) {
      this.setState(prevState => ({
        pageNo: prevState.pageNo - 1,
        isLoading: true,
      }))
      this.getSearchMovies()
    }
  }

  getSearchMovies = async () => {
    const {pageNo} = this.state
    console.log(pageNo)
    const url = `https://api.themoviedb.org/3/search/movie?api_key=a709ef5cf669a418dea9126a1637e743&language=en-US&query=Fast&page=${pageNo}`
    const response = await fetch(url)
    const data = await response.json()
    const formattedData = this.getFormattedData(data)
    this.setState({
      isLoading: false,
      searchMovies: formattedData,
    })
  }

  onChangeSearchVal = value => {
    this.setState({
      searchInput: value,
    })
  }

  renderNoResultsPage = () => {
    const {searchInput} = this.state
    return (
      <div className="no-result-container">
        <img
          alt="no_result_img"
          className="no-result-img"
          src="https://res.cloudinary.com/dkr26vkii/image/upload/v1625560252/Illustration_o0nx6k.jpg"
        />
        <p className="text-white">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderHomeSearchMovies = () => {
    const {searchMovies, searchInput, pageNo} = this.state
    const searchResults = searchMovies.filter(eachMovie =>
      eachMovie.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    // console.log(searchMovies)
    const isNoResults = searchResults.length === 0
    return (
      <>
        <div className="home-search-container">
          <ul className="search-container-list container pt-5">
            {isNoResults
              ? this.renderNoResultsPage()
              : searchResults.map(eachMovie => (
                  <SearchMovieDetails
                    movieDetails={eachMovie}
                    key={eachMovie.id}
                  />
                ))}
          </ul>
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
      </>
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
      <div>
        <div>
          <HeaderWithSearch changeSearchInput={this.onChangeSearchVal} />
        </div>

        <div>
          {isLoading ? this.renderLoader() : this.renderHomeSearchMovies()}
        </div>
      </div>
    )
  }
}

export default HomeSearch
