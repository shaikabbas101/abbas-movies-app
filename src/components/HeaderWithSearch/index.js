import {Link} from 'react-router-dom'
import './index.css'

const HeaderWithSearch = props => {
  const {changeSearchInput} = props
  const onChangeSearchInputVal = event => {
    changeSearchInput(event.target.value)
  }

  return (
    <div className="nav-background-with-search-bar">
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
            <input
              className="form-control text-white bg-dark mr-sm-2 w-75"
              onChange={onChangeSearchInputVal}
              type="search"
              placeholder="Search Movie"
              aria-label="Search"
            />
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
              <form className="form-inline my-2 my-lg-0 ">
                <input
                  className="form-control text-white bg-dark mr-sm-2"
                  onChange={onChangeSearchInputVal}
                  type="search"
                  placeholder="Search Movie"
                  aria-label="Search"
                />
                <Link to="/movies-account">
                  <img
                    className="user-icon"
                    alt="user icon"
                    src="https://res.cloudinary.com/dkr26vkii/image/upload/v1625423555/Group_crxup0.jpg"
                  />
                </Link>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default HeaderWithSearch
