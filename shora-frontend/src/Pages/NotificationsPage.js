import { Typography } from '@mui/material';
import * as React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function NotificationsPage() {
    return (
        <div>
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={200}
                transitionName={'SlideIn'}
            >
                <Typography>
                    Hello World!
                </Typography>
            </ReactCSSTransitionGroup>
        </div>
    )
}

export default NotificationsPage