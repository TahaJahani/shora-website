import { Dialog, TextField, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Grid } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import DoneIcon from '@mui/icons-material/Done';
import * as React from 'react'
import completeInfo from "../../AxiosCalls/Auth/completeInfo"

export default function ChangePasswordForm({ open, onSuccess }) {

    const defaultData = {
        name: '',
        surname: '',
        phone_number: '',
    }
    const [data, setData] = React.useState(defaultData)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState()

    const submitClicked = () => {

        const persianRegex = new RegExp('^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$');
        if (!data.name)
            setError('فیلد نام اجباری می‌باشد')
        else if (!data.surname)
            setError('فیلد نام خانوادگی اجباری می‌باشد')
        else if (!persianRegex.test(data.name) || !persianRegex.test(data.surname))
            setError('نام و نام خانوادگی باید فارسی باشد');
        else {
            setLoading(true)
            setError('')
            completeInfo(data, (res) => {
                setLoading(false)
                onSuccess(res.data);
            }, (err) => {
                setLoading(false)
                setError(err)
            })
        }
    }

    return (
        <Dialog open={open}>
            <DialogTitle textAlign='right'>تکمیل اطلاعات کاربری</DialogTitle>
            <DialogContent>
                <DialogContentText textAlign='right'>
                    برای ادامه، لطفا اطلاعات خود را تکمیل کنید
                </DialogContentText>
                <TextField
                    autoFocus
                    type='text'
                    margin="dense"
                    label="نام"
                    required
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    fullWidth
                    variant="outlined" />
                <TextField
                    value={data.surname}
                    type='text'
                    margin="dense"
                    required
                    onChange={(e) => setData({ ...data, surname: e.target.value })}
                    label="نام خانوادگی"
                    fullWidth
                    variant="outlined" />
                <TextField
                    type='number'
                    margin="dense"
                    value={data.phone_number}
                    onChange={(e) => setData({ ...data, phone_number: e.target.value })}
                    label="شماره تماس"
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
                </Grid>
            </DialogActions>
        </Dialog>
    )
}