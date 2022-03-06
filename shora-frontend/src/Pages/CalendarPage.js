import * as React from 'react'
import Bar from "../Components/Calendar/Bar";
import Column from '../Components/Calendar/Column';
import Day from '../Components/Calendar/Day';
import styled from 'styled-components';
import { unstable_styleFunctionSx } from '@mui/system';
import { Typography } from '@mui/material';
import CourseSelection from '../Components/Calendar/CourseSelection';

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
    let data = [
        {
            name: 'ساختمان‌های گسسته',
            teacher: 'دکتر ضرابی‌زاده',
            color: '#C5D0EB',
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
            name: 'مدارهای منطقی',
            teacher: 'دکتر ارشدی',
            color: '#F5CBCB',
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
    ]

    return (
        <div>
            <CourseSelection courses={data}/>
            <Div sx={{ overflow: 'auto', position: 'absolute', top: { xs: 404, sm: 348 }, left: 16, right: { xs: 36, sm: 256 }, bottom: -332 }}>
                <Div sx={{ height: 150, position: 'sticky', top: 0, background: '#ffffffdf', zIndex: 5000, boxShadow: '0px 2px 4px #888888' }}>
                    <div style={{ position: 'absolute', right: 64, height: '100%' }}>
                        {data.map(course => {
                            return (
                                <Div sx={{ display: 'inline-block', height: '100%', width: 48, marginLeft: '16px', borderLeft: '1px solid' }}>
                                    <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textOrientation: 'mixed', writingMode: 'vertical-lr', width: '100%' }}>
                                        {course.name}
                                    </Typography>
                                </Div>
                            )
                        })}
                    </div>
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
                    {data.map((course, index) =>
                        <Column offset={64 * index + 48} height={days.length * 100} label={course.name} />
                    )}
                    {data.map((course, index) => {
                        return course.assignments.map(assignment => {
                            let offset = (Math.ceil(Math.abs(assignment.release_date - firstDate) / (1000 * 60 * 60 * 24)) - 1) * 100 + 5;
                            let length = (Math.ceil(Math.abs(assignment.due_date - assignment.release_date) / (1000 * 60 * 60 * 24)) + 1) * 100 - 10
                            return <Bar row={index + 1} offset={offset} length={length} color={course.color} />
                        })
                    })}
                </div>
            </Div>
        </div>
    )
}

export default CalendarPage;