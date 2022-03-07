import * as React from 'react'
import { Paper, Tooltip, Typography } from '@mui/material'

function Bar({ title, subtitle, link, row, offset, length, width = 36, color, columnWidth =
    64 }) {
    let right = (row * columnWidth) - (columnWidth - width) / 2 + 4

    const openTab = () => {
        if (link)
            window.open(link, '_blank')
    }
    return (
        <Tooltip
            title={
                <div>
                    <Typography sx={{textAlign: 'center'}}>
                        {title}
                    </Typography>
                    <Typography variant='caption'>
                        {subtitle}
                    </Typography>
                </div>
            }
            arrow>
            <div style={{
                width: width,
                height: length,
                background: color,
                position: 'absolute',
                display: 'block',
                top: offset,
                right: right,
                cursor: 'pointer',
                // boxShadow: '2px 2px 4px #888888',
                borderRadius: '4px',
            }} onClick={openTab}>

            </div>
        </Tooltip>
    )
}

export default Bar;