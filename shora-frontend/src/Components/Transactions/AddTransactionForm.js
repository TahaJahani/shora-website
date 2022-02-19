import { TextField, MenuItem, Card, Autocomplete, InputAdornment, Button, Grid, Typography, Snackbar, Alert } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import * as React from "react"
import { styled } from "@mui/material/styles";
import translate from "../../Helpers/translate";
import addTransaction from "../../AxiosCalls/Transactions/addTransaction";
import { useRecoilState } from "recoil";
import {transactionsAtom} from "../../Atoms/transactionsAtom"
import { LoadingButton } from "@mui/lab";

const transactionTypes = ['withdraw', 'deposit']

const FullWidthTextField = styled(TextField)(() => ({
    width: '100%'
}))

const formatDate = (date) => {
    if (date)
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    else return '';
}

export default function AddTransactionForm({onCancel}) {

    const initialData = {
        amount: '',
        description: '',
        type: '',
        at: formatDate(new Date()),
    }
    const [data, setData] = React.useState(initialData);
    const [transactions, setTransactions] = useRecoilState(transactionsAtom)
    const [error, setError] = React.useState()
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const submitClicked = () => {
        if (!data.amount)
            setError('فیلد مبلغ الزامی است');
        else if (!data.type)
            setError('فیلد نوع تراکنش الزامی است');
        else if (!data.description)
            setError('فیلد توضیحات تراکنش الزامی است')
        else {
            setLoading(true)
            addTransaction(data, (res) => {
                setData(initialData);
                setTransactions([...transactions, res.data.transaction])
                setOpen(true)
                setLoading(false)
            }, () => {})
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
                ثبت تراکنش جدید
            </Typography>
            <Grid container spacing={2} my={2}>
                <Grid item xs={12} sm={4} md={3}>
                    <FullWidthTextField
                        select
                        key={data.type}
                        label="نوع تراکنش"
                        value={data.type}
                        onChange={(e) => setData({ ...data, type: e.target.value })} >
                        {transactionTypes.map((option) => (
                            <MenuItem key={option} value={option}>
                                {translate(option)}
                            </MenuItem>
                        ))}
                    </FullWidthTextField>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <FullWidthTextField
                        type='number'
                        InputProps={{
                            startAdornment: <InputAdornment position="start">مبلغ به تومان</InputAdornment>,
                            inputProps: { min: 0 }
                        }}
                        value={data.amount}
                        onChange={(e) => setData({ ...data, amount: e.target.value })} />
                </Grid>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid item xs={12} sm={4} md={3}>
                        <DatePicker
                            label="تاریخ تراکنش"
                            inputFormat="dd/MM/yyyy"
                            value={data.at}
                            onChange={(newValue) => setData({ ...data, at: formatDate(newValue) })}
                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </Grid>
                </LocalizationProvider>
            </Grid>
            <Grid container spacing={2} mb={2}>
                <Grid item xs={12} sx={9} md={9}>
                    <FullWidthTextField
                        multiline
                        rows={3}
                        placeholder="توضیح تراکنش"
                        value={data.description}
                        onChange={(e) => setData({ ...data, description: e.target.value })} />
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