import * as React from 'react';
import { TextField, Card, Container, Typography, InputAdornment, Link, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import sendEmail from '../AxiosCalls/Auth/sendEmail'
const axios = require('axios')

function RegisterPage() {
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState(false);

    const sendClicked = async () => {
        setLoading(true)
        sendEmail(email, () => {
            setLoading(false)
            setError('اگر ایمیل وارد شده در سامانه ثبت شده باشد، پیامی به آن ارسال شده است. لطفا حساب خود را بررسی کنید.');
        }, () => { });
    }

    return (
        <Container maxWidth="sm" alignitems="center" sx={{ marginTop: 8 }}>
            <Card component='form' variant='outlined' sx={{ paddingY: 6, paddingX: 4 }}>
                <Typography variant='h4' sx={{ marginBottom: 6 }}>بازنشانی رمز عبور</Typography>
                <TextField
                    variant='outlined'
                    label='ایمیل ثبت شده در دانشکده'
                    fullWidth
                    value={email}
                    onChange={(val) => setEmail(val.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AlternateEmailIcon />
                            </InputAdornment>
                        )
                    }}
                    sx={{ marginBottom: 2 }} />
                <Typography
                    color='error'
                    sx={{ marginBottom: 4 }}>
                    {error}
                </Typography>
                <LoadingButton
                    variant='contained'
                    fullWidth
                    loading={loading}
                    onClick={sendClicked}>
                    ارسال ایمیل
                </LoadingButton>
            </Card>
            <Grid container justifyContent='center'>
                <Typography sx={{ my: 2 }}>
                    {'اگر در فرایند بازیابی رمز عبور به مشکلی برخوردید '}
                    <Link target='_blank' href='https://docs.google.com/forms/d/e/1FAIpQLSdG1VjrwEkf4Zp9ubAL8GdLCngcdLUsGBhXhin30C2-79vyTQ/viewform?usp=sf_link'>
                        این فرم
                    </Link>
                    {' را تکمیل کنید'}
                </Typography>
            </Grid>
        </Container>
    )
}

export default RegisterPage