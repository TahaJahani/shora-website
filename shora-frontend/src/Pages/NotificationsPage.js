import { Typography } from '@mui/material';
import * as React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import getNotifications from '../AxiosCalls/Notifications/getNotifications'
import Notification from '../Components/Notifications/Notification';

function NotificationsPage({setSelectedItem}) {

    const [notifications, setNotifications] = React.useState([])
    React.useEffect(() => {
        setSelectedItem('اطلاعیه‌ها');
        getNotifications((res) => {
            setNotifications(res.data.notifications)
        }, () => {})
    }, [])
    return (
        <div>
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={200}
                transitionName={'SlideIn'}
            >
                {notifications.map(notif => <Notification {...notif}/>)}
            </ReactCSSTransitionGroup>
        </div>
    )
}

export default NotificationsPage