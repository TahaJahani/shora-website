import * as React from 'react'
import { Paper } from '@mui/material'

function Bar({ row, offset, length, width = 24, color, margin = 
16 }) {
    let right = row * (width + margin)
    return (
        <div style={{
            width: width,
            marginLeft: 12,
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
    )
}

export default Bar;