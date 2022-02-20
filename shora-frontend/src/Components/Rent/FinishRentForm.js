import * as React from 'react';
import { TextField, Button, Grid, DialogActions, DialogContentText } from "@mui/material";
import {LoadingButton} from '@mui/lab'
import { styled } from "@mui/material/styles";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const FullWidthTextField = styled(TextField)(() => ({
    width: '100%'
}))

const formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export default function FinishRentForm({ loading, selectedRent, onSubmit }) {

    let rent_id = selectedRent ? selectedRent.id : null
    const [data, setData] = React.useState({
        rentable_id: selectedRent.rentable_id,
        amount_returned: '',
        returned_at: formatDate(new Date()),
    });

    const [error, setError] = React.useState('')

    const submitClicked = () => {
        if (!data.amount_returned)
            setError('فیلد مبلغ بازگشتی الزامی است');
        else
            onSubmit({ ...data, rent_id: rent_id })
    }

    return (
        <div>
            <Grid container spacing={2} mb={2} padding={1}>
                <Grid item xs={12} sm={6} md={6}>
                    <FullWidthTextField
                        placeholder="مبلغ بازگشتی (تومان)"
                        type='number'
                        value={data.amount_returned}
                        onChange={(e) => setData({ ...data, amount_returned: e.target.value })} />
                </Grid>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid item xs={12} sm={6} md={6}>
                        <DatePicker
                            label="تاریخ عودت"
                            inputFormat="dd/MM/yyyy"
                            value={data.returned_at}
                            onChange={(newValue) => setData({ ...data, returned_at: formatDate(newValue) })}
                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </Grid>
                </LocalizationProvider>
            </Grid>
            <DialogContentText color='red'>
                {error}
            </DialogContentText>
            <DialogActions>
                <LoadingButton loading={loading} variant="contained" sx={{ width: '100%' }} onClick={submitClicked}>
                <span style={{fontSize: 20, fontWeight: 'bold'}}>عودت</span>
                </LoadingButton>
            </DialogActions>
        </div>
    )
}