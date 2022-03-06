import * as React from 'react'
import Bar from "../Components/Calendar/Bar";
import Column from '../Components/Calendar/Column';
import Day from '../Components/Calendar/Day';
import styled from 'styled-components';
import { unstable_styleFunctionSx } from '@mui/system';

const Div = styled('div')(unstable_styleFunctionSx);

function CalendarPage() {
    let firstDate = new Date('2022-03-05')
    let lastDate = new Date('2022-03-19')
    let days = []
    for (var d = lastDate; d >= firstDate; d.setDate(d.getDate() - 1)) {
        days.push(new Date(d));
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
        <Div sx={{ overflow: 'auto', position: 'absolute', top: {xs: 72,sm: 16}, left: 16, right: {xs: 16, sm: 256}, bottom: 16, borderRadius: 4 }}>
            <div style={{ position: 'relative', height: days.length * 100, width: 1280, minWidth: '100%' }}>
                {days.map(day => {
                    let offset = (Math.ceil(Math.abs(day - firstDate) / (1000 * 60 * 60 * 24))) * 100;
                    return <Day offset={offset} label={day.toLocaleDateString('fa-IR')} width='1280px' />
                })}
                {data.map((course, index) =>
                    <Column offset={64 * index} height={days.length * 100} label={course.name} />
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
    )
}

export default CalendarPage;