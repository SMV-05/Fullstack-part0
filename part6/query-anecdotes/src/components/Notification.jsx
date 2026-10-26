import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: '#e8f5e9',
    borderColor: '#4caf50',
    color: '#2e7d32',
  }

  return <div style={style}>{notification}</div>
}

export default Notification
