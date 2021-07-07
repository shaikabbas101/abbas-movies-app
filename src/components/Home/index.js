import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Header from '../Header'
import TrendingMovies from '../TrendingMovies'
import TopRatedMovies from '../TopRatedMovies'
import OriginalsMovies from '../OriginalsMovies'
import FooterSection from '../FooterSection'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
}

class Home extends Component {
  state = {
    trendingMovies: [],
    topRatedMovies: [],
    originalsMovies: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTopRatedMovies()
    this.getTrendingMovies()
    this.getOriginalsMovies()
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

  getTrendingMovies = async () => {
    const url =
      'https://api.themoviedb.org/3/trending/all/week?api_key=a709ef5cf669a418dea9126a1637e743'
    const response = await fetch(url)
    const data = await response.json()
    const formattedData = this.getFormattedData(data)
    this.setState({trendingMovies: formattedData})
  }

  getTopRatedMovies = async () => {
    const url =
      'https://api.themoviedb.org/3/movie/top_rated?api_key=a709ef5cf669a418dea9126a1637e743'
    const response = await fetch(url)
    const data = await response.json()
    const formattedData = this.getFormattedData(data)

    this.setState({topRatedMovies: formattedData})
  }

  getOriginalsMovies = async () => {
    const url =
      'https://api.themoviedb.org/3/discover/tv?api_key=a709ef5cf669a418dea9126a1637e743'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    const formattedData = data.results.map(movie => ({
      backdropPath: movie.backdrop_path,
      firstAirDate: movie.first_air_date,
      genreIds: movie.genre_ids,
      id: movie.id,
      name: movie.name,
      origin_Country: movie.origin_country,
      originalLanguage: movie.original_language,
      originalName: movie.original_name,
      overview: movie.overview,
      popularity: movie.popularity,
      posterPath: movie.poster_path,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
    }))

    this.setState({originalsMovies: formattedData, isLoading: false})
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#D81F26" height="50" />
    </div>
  )

  renderHomePage = () => {
    const {trendingMovies, topRatedMovies, originalsMovies} = this.state

    return (
      <>
        <div className="background-img-container">
          <Header />
          <div className="container">
            <h1 className="home-movie-heading">Super Man</h1>
            <p className="home-movie-description">
              Superman is a fictional superhero who first appeared in American
              comic books published by DC Comics.
            </p>
            <button type="button" className="btn btn-light">
              Play
            </button>
          </div>
        </div>
        <div className="trending-top-rated-original-container p-4">
          <div className="container">
            <h1 className="side-heading">Trending Now</h1>
            <Slider {...settings}>
              {trendingMovies.map(eachMovie => (
                <TrendingMovies movieDetails={eachMovie} key={eachMovie.id} />
              ))}
            </Slider>
            <h1 className="side-heading">Top Rated</h1>
            <Slider {...settings}>
              {topRatedMovies.map(eachMovie => (
                <TopRatedMovies movieDetails={eachMovie} key={eachMovie.id} />
              ))}
            </Slider>
            <h1 className="side-heading">Originals</h1>
            <Slider {...settings}>
              {originalsMovies.map(eachMovie => (
                <OriginalsMovies movieDetails={eachMovie} key={eachMovie.id} />
              ))}
            </Slider>
          </div>
          <FooterSection />
        </div>
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return <div>{isLoading ? this.renderLoader() : this.renderHomePage()}</div>
  }
}

export default Home
