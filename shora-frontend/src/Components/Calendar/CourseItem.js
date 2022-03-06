import { ButtonBase, Card, CardActionArea, CardContent, CardHeader, Checkbox, Typography } from '@mui/material';
import * as React from 'react'

function CourseItem({ name, teacher, selected, onToggle }) {
    return (
        <ButtonBase onClick={onToggle}>
            <Card variant='outlined'>
                <CardContent>
                    <Typography variant='h6'>
                        {name}
                    </Typography>
                    <Typography variant='caption'>
                        {teacher}
                    </Typography>
                </CardContent>
                <CardActionArea disabled>
                    <Checkbox checked={selected}>
                    </Checkbox>
                </CardActionArea>
            </Card>
        </ButtonBase>
    )
}

export default CourseItem;