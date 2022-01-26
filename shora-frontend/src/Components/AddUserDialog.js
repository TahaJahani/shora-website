import { TextField, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from "@mui/material";
import * as React from "react"
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

const FullWidthTextField = styled(TextField)(() => ({
    width: '100%'
}))

export default function AddUserDialog({ open, loading, onSubmit, onClose }) {

    const [data, setData] = React.useState({
        name: '',
        surname: '',
        student_number: '',
        phone_number: '',
        roles: ['user', 'admin'],
    });

    const [error, setError] = React.useState('')

    const submitClicked = () => {
        if (!data.name)
            setError('فیلد نام اجباری است');
        else if (!data.surname)
            setError('فیلد نام خانوادگی اجباری است')
        else if (!data.student_number)
            setError('فیلد شماره دانشجویی اجباری است')
        else 
            onSubmit(data)
    }

    return (
        <Dialog component='form' sx={{ padding: 1 }} open={open}>
            <DialogTitle dir="rtl">ثبت کاربر جدید </DialogTitle>
            <DialogContent dir="rtl">
                <Grid container spacing={2} mb={2} padding={1}>
                    <Grid item xs={12} sm={6} md={6}>
                        <FullWidthTextField
                            label="نام"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <FullWidthTextField
                            label="نام خانوادگی"
                            value={data.surname}
                            onChange={(e) => setData({ ...data, surname: e.target.value })} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <FullWidthTextField
                            label="شماره دانشجویی"
                            value={data.student_number}
                            onChange={(e) => setData({ ...data, student_number: e.target.value })} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <FullWidthTextField
                            label="شماره تماس"
                            value={data.phone_number}
                            onChange={(e) => setData({ ...data, phone_number: e.target.value })} />
                    </Grid>
                </Grid>
                <DialogContentText color='red'>
                    {error}
                </DialogContentText>
                <DialogActions>
                    <Button variant="text" onClick={() => onClose()}>
                        لغو
                    </Button>
                    <LoadingButton loading={loading} variant="contained" onClick={submitClicked}>
                        ثبت
                    </LoadingButton>
                </DialogActions>
            </DialogContent>
        </Dialog >
    )
}