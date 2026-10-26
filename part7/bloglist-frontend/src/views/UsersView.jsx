import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersView = () => {
  const users = useSelector((state) => state.users)

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  }

  const thStyle = {
    textAlign: 'left',
    padding: '12px 16px',
    backgroundColor: '#f8fafc',
    borderBottom: '2px solid #e2e8f0',
    color: '#475569',
  }

  const tdStyle = {
    padding: '12px 16px',
    borderBottom: '1px solid #f1f5f9',
    color: '#1e293b',
  }

  return (
    <div>
      <h2>Users</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>User</th>
            <th style={thStyle}>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={tdStyle}>
                <Link
                  to={`/users/${user.id}`}
                  style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}
                >
                  {user.name}
                </Link>
              </td>
              <td style={tdStyle}>{user.blogs ? user.blogs.length : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView
