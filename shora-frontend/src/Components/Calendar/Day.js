import { Divider, Typography } from '@mui/material';
import * as React from 'react'

function Day({ offset, height = 100, width = '100%' }) {
    return (
        <div className='calendar_row' style={{
            height: height,
            top: offset,
            width: width,
        }}>
            <div style={{
                float: 'left',
                width: 'auto',
            }}>
            </div>
        </div>
    )
}

export default Day;