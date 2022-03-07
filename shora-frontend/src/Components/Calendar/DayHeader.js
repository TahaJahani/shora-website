import * as React from 'react'
import styled from 'styled-components';
import { unstable_styleFunctionSx } from '@mui/system';
import { Typography } from '@mui/material';

const Div = styled('div')(unstable_styleFunctionSx);
function DayHeader({ firstDate, lastDate, rowHeight = 100, width = 32 }) {
    let range = Array.from(Array(Math.floor((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)) + 1).keys())
    return (
        <Div sx={{ height: rowHeight * range.length, position: 'absolute', top: 0, right: 16, maxWidth: width, borderLeft: '1px solid' }}>
            {range.map(i => {
                const day = new Date()
                day.setTime(firstDate.getTime() + i * (1000 * 60 * 60 * 24))
                return (
                    <Typography key={day.getTime()} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textOrientation: 'mixed', writingMode: 'vertical-lr', height: 100 }}>
                        {day.toLocaleDateString('fa-IR')}
                    </Typography>
                )
            })}
        </Div>
    )
}

export default DayHeader;