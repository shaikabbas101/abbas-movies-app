import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="nav-background">
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            className="nav-logo"
            alt="movies-logo"
            src="https://fontmeme.com/permalink/210704/5626de302b79cd672861215379764815.png"
          />
        </Link>
        <div className="ml-auto d-lg-none">
          <Link to="/search-movies">
            <i className="fas fa-search search-icon"> </i>
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"> </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/" className="nav-link active" id="movies-nav-links">
              Home
              <span className="sr-only">(current)</span>
            </Link>
            <Link
              to="/popular-movies"
              className="nav-link"
              id="movies-nav-links"
            >
              Popular
            </Link>
          </div>
          <div className="ml-auto d-none d-lg-flex">
            <Link to="/search-movies">
              <i className="fas fa-search search-icon"> </i>
            </Link>
            <Link to="/movies-account">
              <img
                className="user-icon"
                alt="user icon"
                src="https://res.cloudinary.com/dkr26vkii/image/upload/v1625423555/Group_crxup0.jpg"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  </div>
)

export default Header
