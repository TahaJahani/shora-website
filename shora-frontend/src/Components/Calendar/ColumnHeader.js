import * as React from 'react'
import styled from 'styled-components';
import { unstable_styleFunctionSx } from '@mui/system';
import { ButtonBase, Card, CardContent, Menu, MenuItem, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import removeCourse from '../../AxiosCalls/Calendar/removeCourse';

const Div = styled('div')(unstable_styleFunctionSx);

function ColumnHeader({ data, onAddClicked, height = 150, width }) {

    return (
        <Div className='calendar_header' sx={{ height: height, minWidth: '100%', width: width }} >
            <div style={{ position: 'absolute', right: 56, height: '100%', width: '100%' }} >
                {data.map(course => {
                    if (course.selected)
                        return (
                            <Div key={course.id} sx={{ display: 'inline-block', height: '100%', width: 48, marginLeft: '16px', borderLeft: '1px solid' }} >
                                <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', textOrientation: 'mixed', writingMode: 'vertical-lr', width: '100%', height: '100%' }} >
                                    {course.name}
                                </Typography>
                            </Div>
                        )
                })}
            </div>
            <ButtonBase onClick={onAddClicked} sx={{ width: 48 }} >
                <Card sx={{ height: 150 }} >
                    <CardContent sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100%' }} >
                        <AddIcon fontSize='large' />
                    </CardContent>
                </Card >
            </ButtonBase>
        </Div >
    )
}

export default ColumnHeader;