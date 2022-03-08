import { Dialog, DialogTitle, Divider, List, TextField } from '@mui/material';
import * as React from 'react'
import CourseItem from './CourseItem'

function CourseSelection({ onToggleCourse, courses, open, onClose }) {

    let [search, setSearch] = React.useState('')
    let filteredCourses = courses.filter(course => {
        if (search !== '')
            return course.name.includes(search) || course.teacher.includes(search)
        return true
    })

    return (
        <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth sx={{textAlign: 'right', direction: 'rtl'}}>
            <DialogTitle>
                {'انتخاب درس'}
            </DialogTitle>
            <TextField 
                placeholder='جستجو'
                sx={{margin: 4, borderRadius: 8, textAlign: 'right'}}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Divider />
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {filteredCourses.map(course =>
                    <CourseItem {...course} onToggle={onToggleCourse} />
                )}
            </List>
        </Dialog>
    )
}

export default CourseSelection;