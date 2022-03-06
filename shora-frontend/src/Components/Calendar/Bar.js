import * as React from 'react'
import { Paper, Tooltip, Typography } from '@mui/material'

function Bar({ data, row, offset, length, width = 36, color, columnWidth =
    64 }) {
    let right = (row * columnWidth) - (columnWidth - width) / 2 + 4
    return (
        <Tooltip title={<Typography>{data}</Typography>} arrow>
            <div style={{
                width: width,
                height: length,
                background: color,
                position: 'absolute',
                display: 'block',
                top: offset,
                right: right,
                // boxShadow: '2px 2px 4px #888888',
                borderRadius: '4px',
            }}>

            </div>
        </Tooltip>
    )
}

export default Bar;