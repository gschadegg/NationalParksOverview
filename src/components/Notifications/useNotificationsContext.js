import React from 'react'

const NotificationContext = React.createContext(undefined)

function NotificationProvider({ children, value }) {
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

function useNotificationContext() {
  const context = React.useContext(NotificationContext)
  if (context === undefined) {
    throw new Error(
      'NotificationContext must be used within a NotificationProvider'
    )
  }
  return context
}

export { NotificationProvider, useNotificationContext }
