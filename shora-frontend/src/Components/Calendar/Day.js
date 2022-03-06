import { Divider, Typography } from '@mui/material';
import * as React from 'react'

function Day({ label, offset, height = 100, width = '100%' }) {
    return (
        <div style={{
            borderBottom: '1px solid #000000',
            height: height,
            position: 'absolute',
            top: offset,
            width: width,
            minWidth: '100%',
            background: '#ffffffaf'
        }}>
            <div style={{
                float: 'left',
                width: 'auto',
            }}>
                <Typography sx={{transform: 'rotate(-90deg) translate(-50%, -50%)'}}>
                    {label}
                </Typography>
            </div>
        </div>
    )
}

export default Day;