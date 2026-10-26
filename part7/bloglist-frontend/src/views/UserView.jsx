import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserView = () => {
  const { id } = useParams()
  const user = useSelector((state) => state.users.find((u) => u.id === id))

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 8,
        border: '1px solid #e2e8f0',
      }}
    >
      <h2 style={{ marginTop: 0 }}>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs && user.blogs.length > 0 ? (
        <ul style={{ paddingLeft: 20 }}>
          {user.blogs.map((blog) => (
            <li key={blog.id} style={{ marginBottom: 8 }}>
              {blog.title}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>
          This user hasn&apos;t added any blogs yet.
        </p>
      )}
    </div>
  )
}

export default UserView
