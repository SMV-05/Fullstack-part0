import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f5f9',
    padding: '12px 20px',
    borderRadius: 8,
    marginBottom: 25,
    border: '1px solid #e2e8f0',
  }

  const linksStyle = {
    display: 'flex',
    gap: 20,
    fontWeight: 600,
  }

  const linkItem = {
    color: '#1e293b',
    textDecoration: 'none',
  }

  const userStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  }

  const buttonStyle = {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '6px 14px',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 500,
  }

  return (
    <nav style={navStyle}>
      <div style={linksStyle}>
        <Link to="/" style={linkItem}>
          blogs
        </Link>
        <Link to="/users" style={linkItem}>
          users
        </Link>
      </div>

      {user && (
        <div style={userStyle}>
          <span>
            <strong>{user.name}</strong> logged in
          </span>
          <button style={buttonStyle} onClick={() => dispatch(logoutUser())}>
            logout
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navigation
