import { Alert, Card, Snackbar, Dialog, TextField, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography, Grid } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import DoneIcon from '@mui/icons-material/Done';
import * as React from 'react'
import changePassword from "../../AxiosCalls/Auth/changePassword"
import { styled } from "@mui/material/styles";

const FullWidthTextField = styled(TextField)(() => ({
    width: '100%',
    textAlign: 'right',
}))

export default function ChangePasswordForm({ open, onClose, onSuccess }) {

    const defaultData = {
        old_password: '',
        new_password: '',
        new_password_confirmation: '',
    }
    const [data, setData] = React.useState(defaultData)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState()

    const submitClicked = () => {
        if (!data.old_password)
            setError('فیلد رمز عبور کنونی اجباری می‌باشد')
        else if (!data.new_password)
            setError('فیلد رمز عبور جدید اجباری می‌باشد')
        else if (!data.new_password_confirmation)
            setError('فیلد تکرار رمز عبور جدید اجباری می‌باشد')
        else {
            setLoading(true)
            setError(null)
            changePassword(data, (res) => {
                setLoading(false)
                setData(defaultData)
                onSuccess()
            }, (err) => {
                setError(err);
                setLoading(false)
            })
        }
    }

    return (
        <Dialog open={open} onClose={onClose} dir="rtl">
        <Card variant="" component='form' sx={{ padding: 2, margin: 2 }} style={{borderRadius: 20}}>
            <Typography variant="h5">
                تغییر رمز عبور
            </Typography>
            <Grid container spacing={2} my={2}>
                <Grid item xs={12} sm={4} md={4}>
                    <FullWidthTextField
                        placeholder="رمز عبور کنونی"
                        value={data.old_password}
                        onChange={(e) => setData({ ...data, old_password: e.target.value })} />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <FullWidthTextField
                        placeholder="رمز عبور جدید"
                        value={data.new_password}
                        onChange={(e) => setData({ ...data, new_password: e.target.value })} />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <FullWidthTextField
                        placeholder="تکرار رمز عبور جدید"
                        value={data.new_password_confirmation}
                        onChange={(e) => setData({ ...data, new_password_confirmation: e.target.value })} />
                </Grid>
            </Grid>
            <Grid container color='red'>
                {error}
            </Grid>
            <div className={"form-father-div-style"}>
            <Grid container justifyContent='flex-end' className={"form-grid-buttons-style"}>
                <Grid item xs={12} sm={1} md={1} justifyItems='flex-end' className={"form-laghv-button-style"}>
                    <Button variant="outlined" sx={{ width: '100%'}} onClick={() => { onClose(); }}>
                        <span style={{fontSize: 20, fontWeight: 'bold'}}>لغو</span>
                    </Button>
                </Grid>
                <Grid item xs={12} sm={1} md={1} justifyItems='flex-end'>
                    

                    <LoadingButton loading={loading} variant="contained" sx={{ width: '100%' }} onClick={submitClicked}>
                        <span style={{fontSize: 20, fontWeight: 'bold'}}>ثبت</span>
                    </LoadingButton>
                </Grid>
            </Grid>
            </div>
        </Card>


            {/* <DialogTitle textAlign='right'>تغییر رمز عبور</DialogTitle> */}
            {/* <Typography variant="h5">
                تغییر رمز عبور
            </Typography>
            <DialogContent>
                <DialogContentText textAlign='right'>
                    برای تغییر رمز عبور، اطلاعات زیر را تکمیل کنید
                </DialogContentText>
                <TextField
                    autoFocus
                    type='password'
                    margin="dense"
                    label="رمز عبور کنونی"
                    value={data.old_password}
                    onChange={(e) => setData({ ...data, old_password: e.target.value })}
                    fullWidth
                    variant="outlined" />
                <TextField
                    value={data.new_password}
                    type='password'
                    margin="dense"
                    onChange={(e) => setData({ ...data, new_password: e.target.value })}
                    label="رمز عبور جدید"
                    fullWidth
                    variant="outlined" />
                <TextField
                    type='password'
                    margin="dense"
                    value={data.new_password_confirmation}
                    onChange={(e) => setData({ ...data, new_password_confirmation: e.target.value })}
                    label="تکرار رمز عبور جدید"
                    fullWidth
                    variant="outlined" />
                <Typography color='error' margin='dense' textAlign={'right'}>
                    {error}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Grid container justifyContent='flex-start'>
                    <LoadingButton
                        loading={loading}
                        onClick={submitClicked}
                        loadingPosition="start"
                        startIcon={<DoneIcon />}
                        variant='contained'>
                        ثبت
                    </LoadingButton>
                    <Button variant='text' onClick={onClose}>لغو</Button>
                </Grid>
            </DialogActions> */}
        </Dialog>
    )
}