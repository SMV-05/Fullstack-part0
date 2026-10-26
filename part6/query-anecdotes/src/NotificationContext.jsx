import { createContext, useReducer, useContext } from 'react'

let timeoutId = null

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  return context[0]
}

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext)
  return context[1]
}

export const useNotify = () => {
  const dispatch = useNotificationDispatch()
  return (message, seconds = 5) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    dispatch({ type: 'SET', payload: message })
    timeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
      timeoutId = null
    }, seconds * 1000)
  }
}

export default NotificationContext
