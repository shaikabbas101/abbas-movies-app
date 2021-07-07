// import {Link} from 'react-router-dom'
import './index.css'

const FooterSection = () => (
  <div className="d-flex flex-column justify-content-center align-items-center mt-4">
    <div className="icons-container">
      <a href="https://www.google.co.in/">
        <i className="fab fa-google social-logo"> </i>
      </a>
      <a href="https://twitter.com/?lang=en">
        <i className="fab fa-twitter social-logo"> </i>
      </a>
      <a href="https://www.instagram.com/">
        <i className="fab fa-instagram social-logo"> </i>
      </a>
      <a href="https://www.youtube.com/">
        <i className="fab fa-youtube social-logo"> </i>
      </a>
    </div>
    <p className="text-white mt-3">Contact Us</p>
  </div>
)

export default FooterSection
