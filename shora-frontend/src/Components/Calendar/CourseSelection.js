import { Dialog, DialogTitle, Grid, List, Paper } from '@mui/material';
import * as React from 'react'
import CourseItem from './CourseItem'

function CourseSelection({ onToggleCourse, courses, open, onClose }) {

    return (
        <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
            <DialogTitle>
                {'انتخاب درس'}
            </DialogTitle>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {courses.map(course =>
                    <CourseItem {...course} onToggle={onToggleCourse} />
                )}
            </List>
        </Dialog>
    )
}

export default CourseSelection;