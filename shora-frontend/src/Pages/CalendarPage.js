import * as React from 'react'
import Bar from "../Components/Calendar/Bar";
import Column from '../Components/Calendar/Column';
import Day from '../Components/Calendar/Day';
import styled from 'styled-components';
import { unstable_styleFunctionSx } from '@mui/system';
import CourseSelection from '../Components/Calendar/CourseSelection';
import ColumnHeader from '../Components/Calendar/ColumnHeader';
import DayHeader from '../Components/Calendar/DayHeader';
import translate from '../Helpers/translate'
import getCourses from '../AxiosCalls/Calendar/getCourses'
import getAssignments from '../AxiosCalls/Calendar/getAssignments'
import { assignmentsAtom } from '../Atoms/assignmentsAtom';
import { coursesAtom } from '../Atoms/coursesAtom';
import Recoil from 'recoil'
import { Dialog, Fab } from '@mui/material';
import AddAssignmentForm from '../Components/Calendar/AddAssignmentForm';
import AddIcon from '@mui/icons-material/Add';
import DaysGrid from '../Components/Calendar/DaysGrid';

const Div = styled('div')(unstable_styleFunctionSx);

function CalendarPage() {

    let [dialogOpen, setDialogOpen] = React.useState(false)
    let [selectCourseOpen, setSelectCourseOpen] = React.useState(false)
    let [data, setData] = Recoil.useRecoilState(assignmentsAtom)
    let [courses, setCourses] = Recoil.useRecoilState(coursesAtom)

    let setting = {
        columnWidth: 64,
        rowHeight: 100,
        columnHeaderHeight: 150,
        rowTitleWidth: 32,
        sidebarWidth: 240,
        topAppBarHeight: 56,
    }

    const getFirstDate = () => {
        let firstDate = new Date()
        for (let item of data) {
            if (item.selected) {
                for (let assignment of item.assignments) {
                    let release_date = new Date(assignment.release_date);
                    if (firstDate.getTime() > release_date.getTime())
                        firstDate = release_date;
                }
            }
        }
        firstDate.setTime(firstDate.getTime() - 1000 * 60 * 60 * 24);
        return firstDate;
    }

    const getLastDate = () => {
        let lastDate = new Date();
        for (let item of data) {
            if (item.selected) {
                for (let assignment of item.assignments) {
                    let due_date = new Date(assignment.due_date);
                    if (lastDate.getTime() < due_date.getTime())
                        lastDate = due_date;
                }
            }
        }
        lastDate.setDate(lastDate.getDate() + 1);
        return lastDate;
    }

    let [firstDate, setFirstDate] = React.useState(getFirstDate())
    let [lastDate, setLastDate] = React.useState(getLastDate())

    React.useEffect(() => {
        getCourses(() => { }, () => { })
        getAssignments(() => { }, () => { })
    }, [])

    React.useEffect(() => {
        setFirstDate(getFirstDate())
        setLastDate(getLastDate())
    }, [data, courses])

    const onToggleCourse = (courseId) => {
        setData(data.map(item => {
            if (item.id == courseId) {
                if (item.selected == false || item.selected == true)
                    return { ...item, selected: !item.selected }
                return { ...item, selected: true }
            }
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

    const getNumDays = () => {
        return Math.floor((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    }

    const addAssignmentToCourse = (assignment) => {
        let isAdded = false
        setData(data.filter(item => {
            if (item.id === assignment.course_semester_id) {
                isAdded = true
                return { ...item, assignments: [...item.assignments, assignment], selected: true }
            }
            return item;
        }))
        if (!isAdded) {
            let course = courses.filter(item => item.id === assignment.course_semester_id)[0];
            setData([...data, { ...course, selected: true, assignments: [assignment] }])
        }
    }

    let numSelectedCourses = data.filter(item => item.selected).length

    return (
        <div>
            <Dialog
                dir='rtl'
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                fullWidth={true}
                maxWidth='md'>
                <AddAssignmentForm
                    onCancel={() => setDialogOpen(false)}
                    onSuccess={(assignment) => {
                        addAssignmentToCourse(assignment)
                        setDialogOpen(false)
                    }} />
            </Dialog>
            <CourseSelection courses={data} onToggleCourse={onToggleCourse} open={selectCourseOpen} onClose={() => setSelectCourseOpen(false)} />
            <Div sx={{ overflow: 'auto', position: 'absolute', top: { xs: setting.topAppBarHeight + 16, sm: 16 }, left: 16, right: { xs: 16, sm: setting.sidebarWidth + 16 }, bottom: 16 }}>
                <ColumnHeader data={data} onAddClicked={() => setSelectCourseOpen(true)} height={setting.columnHeaderHeight} />
                <div style={{ position: 'absolute', height: getNumDays() * setting.rowHeight, width: numSelectedCourses * setting.columnWidth, minWidth: '100%' }}>
                    <DaysGrid firstDate={firstDate} lastDate={lastDate} setting={setting} numSelectedCourses={numSelectedCourses}/>
                    <DayHeader firstDate={firstDate} lastDate={lastDate} rowHeight={setting.rowHeight} width={setting.rowTitleWidth} />
                    {data.map((course) => {
                        if (course.selected)
                            return <Column key={course.id} offset={setting.columnWidth * getIndexOfSelected(course.id) + setting.rowTitleWidth + 8} height={getNumDays() * setting.rowHeight} />
                    })}
                    {data.map((course) => {
                        if (course.selected)
                            return course.assignments.map(assignment => {
                                let release_date = new Date(assignment.release_date);
                                let due_date = new Date(assignment.due_date);
                                let offset = (Math.ceil(Math.abs(release_date - firstDate) / (1000 * 60 * 60 * 24))) * setting.rowHeight + 5;
                                let length = (Math.ceil(Math.abs(due_date - release_date) / (1000 * 60 * 60 * 24)) + 1) * setting.rowHeight - 10
                                return <Bar assignment={assignment} key={assignment.id} columnWidth={setting.columnWidth} row={getIndexOfSelected(course.id) + 1} offset={offset} length={length} color={`#${course.color}`} />
                            })
                    })}
                </div>
            </Div>
            <Fab
                sx={{
                    margin: 1,
                    position: "fixed",
                    bottom: 8,
                    left: 8
                }}
                onClick={() => setDialogOpen(true)}
                variant='extended'
                color='primary'>
                <AddIcon sx={{ ml: 1 }} />
                {'افزودن تکلیف'}
            </Fab>
        </div>
    )
}

export default CalendarPage;