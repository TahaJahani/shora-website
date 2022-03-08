import { Typography } from '@mui/material'
import * as React from 'react'

function Column({offset, height=100, width=64, start=0}) {
    return(
        <div className='calendar_column' style={{
            height: height,
            right: offset,
            top: start,
            width: width,
        }}>
        </div>
    )
}

export default Column

