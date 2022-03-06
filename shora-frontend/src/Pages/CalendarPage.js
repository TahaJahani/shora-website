import * as React from 'react'
import Bar from "../Components/Calendar/Bar";
import Column from '../Components/Calendar/Column';
import Day from '../Components/Calendar/Day';
import styled from 'styled-components';
import { unstable_styleFunctionSx } from '@mui/system';
import { Typography } from '@mui/material';
import CourseSelection from '../Components/Calendar/CourseSelection';
import { ButtonBase, Card, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Div = styled('div')(unstable_styleFunctionSx);

function CalendarPage() {
    let firstDate = new Date('2022-03-05')
    let lastDate = new Date('2022-03-19')
    let days = []
    let daysCopy = []
    for (let d = new Date(lastDate.getTime()); d >= firstDate; d.setDate(d.getDate() - 1)) {
        days.push(new Date(d));
    }
    for (let d = new Date(firstDate.getTime()); d <= lastDate; d.setDate(d.getDate() + 1)) {
        daysCopy.push(new Date(d))
    }
    let [selectCourseOpen, setSelectCourseOpen] = React.useState(false)
    let [data, setData] = React.useState([
        {
            id: 1,
            name: 'ساختمان‌های گسسته',
            teacher: 'دکتر ضرابی‌زاده',
            color: '#C5D0EB',
            selected: false,
            assignments: [
                {
                    type: 'homework',
                    release_date: new Date('2022-03-08'),
                    due_date: new Date('2022-03-15'),
                },
                {
                    type: 'exam',
                    release_date: new Date('2022-03-17'),
                    due_date: new Date('2022-03-17'),
                }
            ]
        },
        {
            id: 2,
            name: 'مدارهای منطقی',
            teacher: 'دکتر ارشدی',
            color: '#F5CBCB',
            selected: false,
            assignments: [
                {
                    type: 'homework',
                    release_date: new Date('2022-03-07'),
                    due_date: new Date('2022-03-14'),
                },
                {
                    type: 'exam',
                    release_date: new Date('2022-03-16'),
                    due_date: new Date('2022-03-16'),
                }
            ]
        }
    ])

    const onToggleCourse = (courseId) => {
        setData(data.map(item => {
            if (item.id == courseId)
                return { ...item, selected: !item.selected }
            return item
        }))
    }

    const getIndexOfSelected = (courseId) => {
        let index = -1
        for (let i = 0; i < data.length; i++) {
            if (data[i].selected)
                index++
            if (data[i].id == courseId)
                return index
        }
    }

    return (
        <div>
            <CourseSelection courses={data} onToggleCourse={onToggleCourse} open={selectCourseOpen} onClose={() => setSelectCourseOpen(false)} />
            <Div sx={{ overflow: 'auto', position: 'absolute', top: { xs: 72, sm: 16 }, left: 16, right: { xs: 36, sm: 256 }, bottom: -332 }}>
                <Div sx={{ height: 150, position: 'sticky', top: 0, background: '#ffffffdf', zIndex: 2, boxShadow: '0px 2px 4px #888888' }}>
                    <div style={{ position: 'absolute', right: 64, height: '100%' }}>
                        {data.map(course => {
                            if (course.selected)
                                return (
                                    <Div sx={{ display: 'inline-block', height: '100%', width: 48, marginLeft: '16px', borderLeft: '1px solid' }}>
                                        <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textOrientation: 'mixed', writingMode: 'vertical-lr', width: '100%' }}>
                                            {course.name}
                                        </Typography>
                                    </Div>
                                )
                        })}
                    </div>
                    <ButtonBase onClick={() => setSelectCourseOpen(true)} sx={{width: 48}}>
                        <Card sx={{ height: 150 }}>
                            <CardContent sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100%' }}>
                                <AddIcon fontSize='large' />
                            </CardContent>
                        </Card>
                    </ButtonBase>
                </Div>
                <div style={{ position: 'absolute', height: days.length * 100, width: 2580, minWidth: '100%' }}>
                    {days.map(day => {
                        let offset = (Math.ceil(Math.abs(day - firstDate) / (1000 * 60 * 60 * 24))) * 100;
                        return <Day offset={offset} label={day.toLocaleDateString('fa-IR')} width='1280px' />
                    })}
                    <Div sx={{ height: 100 * days.length, position: 'absolute', top: 0, right: 16, maxWidth: '32px', borderLeft: '1px solid' }}>
                        {daysCopy.map(day => {
                            return (
                                <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textOrientation: 'mixed', writingMode: 'vertical-lr', height: 100 }}>
                                    {day.toLocaleDateString('fa-IR')}
                                </Typography>
                            )
                        })}
                    </Div>
                    {data.map((course, index) => {
                        if (course.selected)
                            return <Column offset={64 * getIndexOfSelected(course.id) + 48} height={days.length * 100} label={course.name} />
                    })}
                    {data.map((course, index) => {
                        if (course.selected)
                            return course.assignments.map(assignment => {
                                let offset = (Math.ceil(Math.abs(assignment.release_date - firstDate) / (1000 * 60 * 60 * 24)) - 1) * 100 + 5;
                                let length = (Math.ceil(Math.abs(assignment.due_date - assignment.release_date) / (1000 * 60 * 60 * 24)) + 1) * 100 - 10
                                return <Bar row={getIndexOfSelected(course.id) + 1} offset={offset} length={length} color={course.color} />
                            })
                    })}
                </div>
            </Div>
        </div>
    )
}

export default CalendarPage;