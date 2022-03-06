import * as React from 'react'
import styled from 'styled-components';
import { unstable_styleFunctionSx } from '@mui/system';
import {  Typography } from '@mui/material';

const Div = styled('div')(unstable_styleFunctionSx);
function DayHeader({days} ) {
    return (
        <Div sx={{ height: 100 * days.length, position: 'absolute', top: 0, right: 16, maxWidth: '32px', borderLeft: '1px solid' }}>
            {days.map(day => {
                return (
                    <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textOrientation: 'mixed', writingMode: 'vertical-lr', height: 100 }}>
                        {day.toLocaleDateString('fa-IR')}
                    </Typography>
                )
            })}
        </Div>
    )
}

export default DayHeader;