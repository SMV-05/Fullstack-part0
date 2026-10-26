const Notification = ({ notification }) => {
  if (!notification || !notification.message) {
    return null
  }

  const style = {
    color: notification.type === 'error' ? '#d32f2f' : '#2e7d32',
    background: notification.type === 'error' ? '#fdecea' : '#edf7ed',
    fontSize: 16,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  }

  return (
    <div style={style} className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  )
}

export default Notification
