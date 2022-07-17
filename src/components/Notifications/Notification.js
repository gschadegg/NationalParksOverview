import React from 'react'
import {
  useNotificationContext,
  NotificationProvider,
} from './useNotificationsContext'

import styles from './Notification.module.scss'

export default function Notification({ value }) {
  return (
    <NotificationProvider value={value}>
      <NotificationMessage />
    </NotificationProvider>
  )
}

function NotificationMessage() {
  const notificationCXT = useNotificationContext()
  return (
    <div
      className={`${styles.notification} ${
        notificationCXT.showNotification ? styles.show : ''
      } ${styles[notificationCXT.notification?.type]}`}
    >
      {notificationCXT.notification?.message}
    </div>
  )
}
