import * as React from 'react';
import { TextField, Card, Container, Typography, InputAdornment, Link, Grid, Divider, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import sendEmail from '../AxiosCalls/Auth/sendEmail'
const axios = require('axios')

function RegisterPage(props) {
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState(false);

    // https://stackoverflow.com/questions/41348459/regex-in-react-email-validation
    const isEmail = (val) => {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(val)){
          return false;
        }
        return true;
    }

    const sendClicked = async () => {
        if (email == null || email == "") {
            setError("لطفا ایمیل خود را وارد نمایید.")
            return;
        }

        if (!isEmail(email)) {
            setError("لطفا ایمیل معتبری را وارد نمایید.")
            return;
        }

        setLoading(true)
        sendEmail(email, () => {
            setLoading(false)
            setError('اگر ایمیل وارد شده در سامانه ثبت شده باشد، پیامی به آن ارسال شده است. لطفا حساب خود را بررسی کنید.');
        }, () => { });
    }

    return (
        <Container maxWidth="sm" alignitems="center" sx={{ marginTop: 8 }}>
            <Card component='form' sx={{ paddingY: 6, paddingX: 4 }} style={{borderRadius: 20}} className={"demand-card-bg"}>
                <div className="textCenter">
                    <Typography variant='h4' sx={{ marginBottom: 6 }}><div style={{fontWeight: 'bold', fontSize: 45, color: '#e55c00'}}>
                        {props.isForRegister == "true" ?
                         "ثبت‌ نام" 
                         : "بازیابی رمز عبور"}
                    </div></Typography>
                </div>

                <div className="textCenter">
                    <Typography variant='h4' sx={{ marginBottom: 6 }}><div style={{fontSize: 20, textAlign: 'center', lineHeight: '150%'}}>لطفا ایمیلی از خود که دامنه‌ی آن سایت دانشکده‌ی مهندسی کامپیوتر (CE) باشد را وارد نمایید.</div></Typography>
                </div>
                <TextField
                    variant='outlined'
                    fullWidth
                    value={email}
                    onChange={(val) => setEmail(val.target.value)}
                    InputProps={{
                        inputProps: {
                            style: {textAlign: 'center',},
                        },
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
                        <span style={{textAlign: 'center'}} className="textCenter">
                            {error}
                        </span>
                </Typography>
                <LoadingButton
                    variant='contained'
                    fullWidth
                    loading={loading}
                    onClick={sendClicked}>
                    <span style={{fontSize: 20, fontWeight: 'bold'}}>
                        ارسال ایمیل
                    </span>
                </LoadingButton>

                <Divider sx={{ marginY: 2, fontFamily: "B Nazanin" }}> یا </Divider>
                <Button variant='outlined' fullWidth href='/login'><span style={{fontSize: 20, fontWeight: 'bold'}}>بازگشت به صفحه‌ی ورود</span></Button>
            
                <Grid container justifyContent='center'>
                <Typography sx={{ my: 2, marginBottom: 0, marginTop: 5 }}>
                    {props.isForRegister == "true" ?
                    'اگر در فرایند ثبت‌ نام به مشکلی برخوردید، '
                :
                'اگر در فرایند بازیابی رمز عبور به مشکلی برخوردید، '}
                    <Link target='_blank' href='https://docs.google.com/forms/d/e/1FAIpQLSdG1VjrwEkf4Zp9ubAL8GdLCngcdLUsGBhXhin30C2-79vyTQ/viewform?usp=sf_link' style={{textDecoration: 'none'}}>
                        این فرم
                    </Link>
                    {' را تکمیل کنید.'}
                </Typography>
              </Grid>

            </Card>
            
        </Container>
    )
}

export default RegisterPage