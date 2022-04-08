import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react'

function PayForm({ title,  subtitle, value = null, onSubmit }) {

    const [amount, setAmount] = React.useState('')
    const [error, setError] = React.useState('')

    const onPayClicked = () => {
        if (!value && amount < 1000 || amount > 500000000) {
            setError("مبلغ مورد نظر باید بین ۱.۰۰۰ و ۵۰۰.۰۰۰.۰۰۰ ریال باشد")
            return;
        }
        setError('')
        onSubmit(amount)
    }

    return (
        <Stack direction={'column'}>
            <Typography sx={{ marginBottom: 2 }} variant='h6'>
                {title}
            </Typography>
            <Typography sx={{mb: 2, whiteSpace: 'pre-line'}}>
                {subtitle}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    {value &&
                        <Typography>
                            {`مبلغ: ${value} ریال`}
                        </Typography>
                    }
                    {!value && 
                        <TextField
                            value={amount}
                            type={'number'}
                            helperText={amount == 0 ? '' : `${amount / 10} تومان`}
                            fullWidth
                            placeholder={'مبلغ (ریال)'}
                            onChange={(e) => setAmount(e.target.value)} />
                    }
                </Grid>
                <Grid item xs={12} md={2} lg={1.5} alignItems={'center'} justifyContent={'center'} sx={{my: 'auto'}}>
                    <Button onClick={onPayClicked} fullWidth variant={'contained'}>
                        {"پرداخت"}
                    </Button>
                </Grid>
            </Grid>
            <Typography color={'error'}>
                {error}
            </Typography>
        </Stack>
    )
}

export default PayForm;