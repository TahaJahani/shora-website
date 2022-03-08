import * as React from 'react'
import { Card, Typography, Autocomplete, Grid, TextField, Snackbar, Alert, Button, MenuItem } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { styled } from "@mui/material/styles";
import { useRecoilState } from 'recoil'
import { coursesAtom } from '../../Atoms/coursesAtom';
import addAssignment from '../../AxiosCalls/Calendar/addAssignment'
import translate from '../../Helpers/translate';

const types = ['homework', 'midterm', 'final', 'project', 'quiz']

const FullWidthTextField = styled(TextField)(() => ({
    width: '100%',
    textAlign: 'right'
}))

const FullWidthAutoComplete = styled(Autocomplete)(() => ({
    width: '100%',
    textAlign: 'right'
}))

function AddAssignmentForm({ onCancel, onSuccess }) {

    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('');
    const [courses, setCourses] = useRecoilState(coursesAtom)
    const [snackbarOpen, setSnackbarOpen] = React.useState();
    const [data, setData] = React.useState({
        course_semester_id: 1,
        release_date: "",
        due_date: "",
        type: "homework",
        description: "",
        link: ""
    })

    const onSubmit = () => {
        setLoading(true)
        console.log(data)
        addAssignment(
            data,
            (res) => onSuccess(res.data.assignment),
            (err) => { setError(err); setLoading(false) }
        )
    }

    return (
        <Card variant="" component='form' sx={{ padding: 2, margin: 2, borderRadius: '20px', overflow: 'auto' }} >
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}>
                <Alert severity="success" sx={{ width: '100%' }} dir="rtl">
                    {'با موفقیت ثبت شد'}
                </Alert>
            </Snackbar>

            <Typography variant="h5">
                {'ثبت تکلیف جدید'}
            </Typography>
            <Grid container spacing={2} my={2}>
                <Grid item xs={12} sm={6} md={6}>
                    <FullWidthTextField
                        placeholder="نام تکلیف"
                        value={data.description}
                        onChange={(e) => setData({ ...data, description: e.target.value })} />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <FullWidthAutoComplete
                        options={courses}
                        value={courses.filter(item => item.id == data.course_semester_id)[0]}
                        noOptionsText='درس یافت نشد'
                        onChange={(e, newValue) => setData({ ...data, course_semester_id: newValue ? newValue.id : null })}
                        getOptionLabel={(option) => option.name + " | " + option.teacher + " | " + option.group_number}
                        renderInput={(params) => <TextField {...params} placeholder="درس" />}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={3}>
                    <FullWidthTextField
                        select
                        key={data.type}
                        placeholder="نوع تکلیف"
                        value={data.type}
                        onChange={(e) => setData({ ...data, type: e.target.value })} >
                        {types.map((option) => (
                            <MenuItem key={option} value={option}>
                                {translate(option)}
                            </MenuItem>
                        ))}
                    </FullWidthTextField>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <FullWidthTextField
                        placeholder="تاریخ انتشار"
                        value={data.release_date}
                        helperText="به فرمت yyyy-mm-dd"
                        onChange={(e) => setData({ ...data, release_date: e.target.value })} />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <FullWidthTextField
                        placeholder="تاریخ پایان"
                        helperText="به فرمت yyyy-mm-dd"
                        value={data.due_date}
                        onChange={(e) => setData({ ...data, due_date: e.target.value })} />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <FullWidthTextField
                        placeholder="لینک دانلود"
                        value={data.link}
                        onChange={(e) => setData({ ...data, link: e.target.value })} />
                </Grid>
            </Grid>
            <Grid container color='red'>
                {error}
            </Grid>
            <Grid container justifyContent='flex-end' sx={{ marginTop: 2 }} spacing={2}>
                <Grid item xs={12} sm={1} md={1} justifyItems='flex-end'>
                    <Button variant="outlined" sx={{ width: '100%' }} onClick={() => { onCancel(); }}>
                        <span style={{ fontSize: 20, fontWeight: 'bold' }}>لغو</span>
                    </Button>
                </Grid>
                <Grid item xs={12} sm={1} md={1} justifyItems='flex-end'>
                    <LoadingButton loading={loading} variant="contained" sx={{ width: '100%' }} onClick={onSubmit}>
                        <span style={{ fontSize: 20, fontWeight: 'bold' }}>ثبت</span>
                    </LoadingButton>
                </Grid>
            </Grid>
        </Card>
    )
}

export default AddAssignmentForm;