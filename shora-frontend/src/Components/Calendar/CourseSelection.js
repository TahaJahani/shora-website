import { Grid, Paper } from '@mui/material';
import * as React from 'react'
import CourseItem from './CourseItem'

function CourseSelection({ onToggleCourse, courses }) {

    return (
        <Paper variant='outlined' sx={{ height: '300px', background: 'transparent' }}>
            <Grid container spacing={2}>
                {courses.map(course =>
                    <Grid item xs={6} md={1.5}>
                        <CourseItem name={course.name} teacher={course.teacher} />
                    </Grid>
                )}
            </Grid>
        </Paper>
    )
}

export default CourseSelection;