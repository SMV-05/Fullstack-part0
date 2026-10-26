import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification || !notification.message) {
    return null
  }

  const isError = notification.type === 'error'

  const style = {
    padding: '12px 16px',
    marginBottom: 20,
    borderRadius: 6,
    fontSize: 16,
    fontWeight: 500,
    backgroundColor: isError ? '#ffebee' : '#e8f5e9',
    color: isError ? '#c62828' : '#2e7d32',
    border: `1px solid ${isError ? '#ef9a9a' : '#a5d6a7'}`,
  }

  return (
    <div style={style} className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  )
}

export default Notification
