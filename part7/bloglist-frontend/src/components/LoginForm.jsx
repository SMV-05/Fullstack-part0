import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  const formStyle = {
    maxWidth: 400,
    margin: '40px auto',
    padding: 24,
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  }

  const inputGroup = {
    marginBottom: 16,
  }

  const labelStyle = {
    display: 'block',
    marginBottom: 6,
    fontWeight: 600,
    fontSize: 14,
    color: '#334155',
  }

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: 6,
    border: '1px solid #cbd5e1',
    boxSizing: 'border-box',
    fontSize: 14,
  }

  const buttonStyle = {
    width: '100%',
    padding: '10px 16px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 15,
  }

  return (
    <div style={formStyle}>
      <h2 style={{ marginTop: 0, marginBottom: 20, color: '#0f172a' }}>
        Log in to application
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={inputGroup}>
          <label style={labelStyle}>username</label>
          <input
            style={inputStyle}
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div style={inputGroup}>
          <label style={labelStyle}>password</label>
          <input
            style={inputStyle}
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button style={buttonStyle} type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
