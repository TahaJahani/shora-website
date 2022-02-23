import * as React from 'react'
import { Paper, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

function Notification({ body, severity, seen }) {
    let color = severity == 'info' ? '#0288d1' : '#d32f2f';
    let bgColor = severity == 'info' ? '#c3d8e1' : '#f7c6c5'
    let Icon = severity == 'info' ? InfoIcon : WarningIcon
    let variant = seen ? 'outlined' : 'elevation'
    let sx = {marginY: 2, padding: 2, borderRadius: 3, backgroundColor: bgColor}
    if (!seen)
        sx.borderRight = `10px solid ${color}`
    return (
        <div className={"on-hover-lighten"}>
            <Paper sx={sx} variant={variant} elevation={4}>
                <Icon sx={{color: color, marginLeft: 2, verticalAlign: 'middle'}} />
                {body}
            </Paper>
        </div>
    )
}

export default Notification;