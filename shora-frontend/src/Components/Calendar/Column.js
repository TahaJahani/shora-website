import { Typography } from '@mui/material'
import * as React from 'react'

function Column({label, offset, height=100, width=64, start=0}) {
    return(
        <div style={{
            borderLeft: '1px solid #000000',
            height: height,
            position: 'absolute',
            right: offset,
            top: start,
            width: width,
        }}>
        </div>
    )
}

export default Column

