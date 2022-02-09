import { TextField, MenuItem, Card, Autocomplete, InputAdornment, Button, Grid, Typography, Snackbar, Alert } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import * as React from "react"
import { useRecoilState } from "recoil";
import { styled } from "@mui/material/styles";
import translate from "../Helpers/translate";
import { lockersAtom } from "../Atoms/lockersAtom";
import { usersAtom } from "../Atoms/usersAtom"
import getAllLockers from "../AxiosCalls/Lockers/getAllLockers";
import getAllStudentNumbers from "../AxiosCalls/User/getAllStudentNumbers";
import AddUserDialog from "./AddUserDialog"
import SearchStudentNumberTextField from "./SearchStudentNumberTextField";
import registerUser from "../AxiosCalls/User/registerUser"
import addRent from "../AxiosCalls/Rents/addRent";
import { LoadingButton } from "@mui/lab";

const rentableTypes = ['locker']//TODO: , 'book']

const FullWidthAutoComplete = styled(Autocomplete)(() => ({
    width: '100%',
}))

const FullWidthTextField = styled(TextField)(() => ({
    width: '100%'
}))

const formatDate = (date) => {
    if (date)
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    else return ''
}

export default function AddRentForm({rentable_id, rentable_type, onSubmit}) {

    let return_deadline = new Date(new Date().getYear() + 1900, 5, 21);
    if (new Date().getTime() > return_deadline.getTime())
        return_deadline = new Date(new Date().getYear() + 1901, 5, 21);

    const initialData = {
        user_id: null,
        amount_paid: '',
        rentable_id: rentable_id,
        rentable_type: rentable_type ? rentable_type : rentableTypes[0],
        rented_at: formatDate(new Date()),
        return_deadline: formatDate(return_deadline),
    }
    const [data, setData] = React.useState(initialData);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogLoading, setDialogLoading] = React.useState(false)
    const [error, setError] = React.useState()
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [lockers, setLockers] = useRecoilState(lockersAtom)
    const [users, setUsers] = useRecoilState(usersAtom)

    const submitClicked = () => {
        if (!data.rentable_id)
            setError('فیلد شماره کمد اجباری است');
        else if (!data.amount_paid)
            setError('فیلد مبلغ پرداخت شده اجباری است');
        else {
            setLoading(true)
            addRent(data, (res) => {
                setData(initialData);
                setOpen(true);
                setLoading(false)
                if (onSubmit)
                    onSubmit();
            }, () => { });
        }
    }

    React.useEffect(() => {
        if (!lockers)
            getAllLockers((res) => setLockers(res.data.lockers), () => { });
        if (!users)
            getAllStudentNumbers((res) => setUsers(res.data.users), () => { })
    }, [])

    const selectedLocker = lockers ? lockers.find(item => item.id === data.rentable_id) : null

    return (
        <Card variant="" component='form' sx={{ padding: 2, margin: 2 }}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}>
                <Alert severity="success" sx={{ width: '100%' }} dir="rtl">
                    با موفقیت ثبت شد
                </Alert>
            </Snackbar>
            
            <Grid container spacing={2} my={2}>
                <Grid item xs={12} sm={4} md={3}>
                    <FullWidthTextField
                        select
                        key={data.rentable_type}
                        label="نوع کرایه"
                        value={data.rentable_type}
                        onChange={(e) => setData({ ...data, rentable_type: e.target.value })} >
                        {rentableTypes.map((option) => (
                            <MenuItem key={option} value={option}>
                                {translate(option)}
                            </MenuItem>
                        ))}
                    </FullWidthTextField>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    {data.rentable_type === 'locker' && lockers && <FullWidthAutoComplete
                        options={lockers}
                        value={selectedLocker ? selectedLocker : null}
                        noOptionsText='کمد یافت نشد'
                        onChange={(e, newValue) => setData({ ...data, rentable_id: newValue ? newValue.id : null })}
                        getOptionLabel={(option) => option.letter + option.number}
                        renderInput={(params) => <TextField {...params} label="شماره کمد" />}
                    />}
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    {users && <SearchStudentNumberTextField
                        value={data.user_id}
                        onChange={(newId) => setData({ ...data, user_id: newId })}
                        onNotFound={() => setDialogOpen(true)} />}
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={3}>
                    <FullWidthTextField
                        label="مبلغ پرداخت شده"
                        type='number'
                        InputProps={{
                            startAdornment: <InputAdornment position="start">تومان</InputAdornment>,
                            inputProps: { min: 0 }
                        }}
                        value={data.amount_paid}
                        onChange={(e) => setData({ ...data, amount_paid: e.target.value })} />
                </Grid>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid item xs={12} sm={4} md={3}>
                        <DatePicker
                            label="تاریخ کرایه"
                            inputFormat="dd/MM/yyyy"
                            value={data.rented_at}
                            onChange={(newValue) => setData({ ...data, rented_at: formatDate(newValue) })}
                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <DatePicker
                            label="مهلت عودت"
                            inputFormat="dd/MM/yyyy"
                            value={data.return_deadline}
                            onChange={(newValue) => setData({ ...data, return_deadline: formatDate(newValue) })}
                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </Grid>
                </LocalizationProvider>
            </Grid>
            <Grid container color='red'>
                {error}
            </Grid>
            <Grid container justifyContent='flex-end' sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={1} md={1} justifyItems='flex-end'>
                    <LoadingButton loading={loading} variant="contained" sx={{ width: '100%' }} onClick={submitClicked}>
                        ثبت
                    </LoadingButton>
                </Grid>
            </Grid>
            <AddUserDialog
                open={dialogOpen}
                loading={dialogLoading}
                onSubmit={(data) => {
                    //TODO
                    setDialogLoading(true)
                    registerUser(data, (res) => {
                        setDialogOpen(false)
                        setDialogLoading(false)
                    }, (msg) => { console.log(msg) })
                }}
                onClose={() => { setDialogOpen(false) }} />
        </Card>
    )
}