import { useState, useCallback } from 'react'

function useNotification() {
  const [notification, setNotification] = useState({ message: '', type: '' })
  const [showNotification, setShowNotification] = useState(false)

  const notificationHandler = useCallback((message, type) => {
    setNotification({ message: message, type: type })
    setShowNotification(true)
    setTimeout(() => {
      setNotification({ message: '', type: '' })
      setShowNotification(false)
    }, 5000)
  }, [])

  return {
    notification,
    showNotification,
    notificationHandler,
  }
}

useNotification.types = {
  notification: 'notification',
  showNotification: 'showNotification',
  notificationHandler: 'notificationHandler',
}

export { useNotification }
