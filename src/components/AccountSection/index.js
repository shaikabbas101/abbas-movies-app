import './index.css'
import Cookies from 'js-cookie'
import AccountHeader from '../AccountHeader'

const AccountSection = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/sign-in')
  }
  return (
    <div>
      <AccountHeader />
      <div className="container">
        <h1 className="account-heading mt-3">Account</h1>
        <hr />
        <div className="d-flex flex-row">
          <p className="account-side-headings">Membership:</p>
          <div className="ml-3">
            <p>shaik@101@gmail.com</p>
            <p className="password">Passwords:********</p>
          </div>
        </div>
        <hr />
        <div className="d-flex flex-row">
          <p className="account-side-headings">Plan details:</p>
          <p className="ml-3 account-type">
            Premium <span className="quality">Ultra HD</span>
          </p>
        </div>
        <hr />
        <div className="text-center">
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
export default AccountSection
