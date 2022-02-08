import { TextField, MenuItem, Card, Autocomplete, InputAdornment, Button, Grid, Typography, Snackbar, Alert } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import * as React from "react"
import { styled } from "@mui/material/styles";
import addLostAndFound from "../../AxiosCalls/LostAndFound/addLostAndFound"
import { LoadingButton } from "@mui/lab";

const rentableTypes = ['locker']//TODO: , 'book']

const FullWidthAutoComplete = styled(Autocomplete)(() => ({
    width: '100%',
    textAlign: 'right',
}))

const FullWidthTextField = styled(TextField)(() => ({
    width: '100%',
    textAlign: 'right',
}))

const formatDate = (date) => {
    if (date)
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    else return ''
}

export default function AddRentForm({ onAdd, onCancel }) {

    const initialData = {
        name: '',
        found_in: '',
        found_at: formatDate(new Date),
    }
    const [data, setData] = React.useState(initialData);
    const [error, setError] = React.useState()
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const submitClicked = () => {
        if (!data.name)
            setError('فیلد نام اجباری است');
        else if (!data.found_in)
            setError('فیلد مکان پیدا شدن اجباری است');
        else {
            setLoading(true)
            addLostAndFound(data, (res) => {
                setData(initialData);
                setOpen(true);
                setLoading(false)
                onAdd(res.data.lost_and_found)
            }, () => { });
        }
    }

    return (
        <Card variant="" component='form' sx={{ padding: 2, margin: 2 }} style={{borderRadius: 20}}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}>
                <Alert severity="success" sx={{ width: '100%' }} dir="rtl">
                    با موفقیت ثبت شد
                </Alert>
            </Snackbar>
            <Typography variant="h5">
                ثبت شی جدید
            </Typography>
            <Grid container spacing={2} my={2}>
                <Grid item xs={12} sm={4} md={3}>
                    <FullWidthTextField
                        placeholder="شی پیدا شده"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })} />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <FullWidthTextField
                        placeholder="مکان پیدا شدن"
                        value={data.found_in}
                        onChange={(e) => setData({ ...data, found_in: e.target.value })} />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <span dir="ltr">
                            <DatePicker
                                style={{fontFamily: "Helvetica, sans-serif"}}
                                inputFormat="yyyy-MM-dd"
                                value={data.found_at}
                                onChange={(newValue) => setData({ ...data, found_at: formatDate(newValue) })}
                                renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                            />
                        </span>
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <Grid container color='red'>
                {error}
            </Grid>
            <Grid container justifyContent='flex-end' sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={1} md={1} justifyItems='flex-end' style={{marginLeft: 20}}>
                    <Button variant="outlined" sx={{ width: '100%'}} onClick={() => { onCancel(); }}>
                        <span style={{fontSize: 20, fontWeight: 'bold'}}>لغو</span>
                    </Button>
                </Grid>
                <Grid item xs={12} sm={1} md={1} justifyItems='flex-end'>
                    

                    <LoadingButton loading={loading} variant="contained" sx={{ width: '100%' }} onClick={submitClicked}>
                        <span style={{fontSize: 20, fontWeight: 'bold'}}>ثبت</span>
                    </LoadingButton>
                </Grid>
            </Grid>
        </Card>
    )
}