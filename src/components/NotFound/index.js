import './index.css'
import {Link} from 'react-router-dom'
import AccountHeader from '../AccountHeader'

const NotFound = () => (
  <div>
    <AccountHeader />
    <div className="not-found-bg-container">
      <h1 className="lost-heading">Lost Your Way ?</h1>
      <p className="error-description mt-3 mb-3">
        Sorry, we can’t find that page. You’ll find lots to explore on the home
        page{' '}
      </p>
      <div className="mb-3">
        <Link to="/">
          <button type="button" className="btn btn-light">
            Movies Home
          </button>
        </Link>
      </div>
      <div className="d-flex flex-row mt-3">
        <p className="text-white error-code">Error code</p>
        <p className="ml-3 text-white error"> NSES- 404</p>
      </div>
    </div>
  </div>
)

export default NotFound
