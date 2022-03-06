import * as React from 'react'
import Bar from "../Components/Calendar/Bar";
import Column from '../Components/Calendar/Column';
import Day from '../Components/Calendar/Day';
import styled from 'styled-components';
import { unstable_styleFunctionSx } from '@mui/system';
import CourseSelection from '../Components/Calendar/CourseSelection';
import ColumnHeader from '../Components/Calendar/ColumnHeader';
import DayHeader from '../Components/Calendar/DayHeader';

const Div = styled('div')(unstable_styleFunctionSx);

function CalendarPage() {

    let setting = {
        columnWidth: 64,
        rowHeight: 100,
        columnHeaderHeight: 150,
        rowTitleWidth: 32,
        sidebarWidth: 240,
        topAppBarHeight: 56,
    }

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
        },
        {
            id: 3,
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
        },
        {
            id: 4,
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
        },
        {
            id: 5,
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
        },
        {
            id: 6,
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
        },
        {
            id: 7,
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
        }, {
            id: 8,
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

    let numSelectedCourses = data.filter(item => item.selected).length

    return (
        <div>
            <CourseSelection courses={data} onToggleCourse={onToggleCourse} open={selectCourseOpen} onClose={() => setSelectCourseOpen(false)} />
            <Div sx={{ overflow: 'auto', position: 'absolute', top: { xs: setting.topAppBarHeight + 16, sm: 16 }, left: 16, right: { xs: 16, sm: setting.sidebarWidth + 16 }, bottom: 16 }}>
                <ColumnHeader data={data} onAddClicked={() => setSelectCourseOpen(true)} height={setting.columnHeaderHeight} />
                <div style={{ position: 'absolute', height: days.length * setting.rowHeight, width: numSelectedCourses * setting.columnWidth, minWidth: '100%' }}>
                    {days.map(day => {
                        let offset = (Math.ceil(Math.abs(day - firstDate) / (1000 * 60 * 60 * 24))) * setting.rowHeight;
                        return <Day height={setting.rowHeight} offset={offset} label={day.toLocaleDateString('fa-IR')} width={numSelectedCourses * setting.columnWidth} />
                    })}
                    <DayHeader days={daysCopy} rowHeight={setting.rowHeight} width={setting.rowTitleWidth} />
                    {data.map((course) => {
                        if (course.selected)
                            return <Column offset={setting.columnWidth * getIndexOfSelected(course.id) + setting.rowTitleWidth + 8} height={days.length * setting.rowHeight}/>
                    })}
                    {data.map((course) => {
                        if (course.selected)
                            return course.assignments.map(assignment => {
                                let offset = (Math.ceil(Math.abs(assignment.release_date - firstDate) / (1000 * 60 * 60 * 24)) - 1) * setting.rowHeight + 5;
                                let length = (Math.ceil(Math.abs(assignment.due_date - assignment.release_date) / (1000 * 60 * 60 * 24)) + 1) * setting.rowHeight - 10
                                return <Bar columnWidth={setting.columnWidth} row={getIndexOfSelected(course.id) + 1} offset={offset} length={length} color={course.color} />
                            })
                    })}
                </div>
            </Div>
        </div>
    )
}

export default CalendarPage;