import * as React from 'react';
import { TextField, Card, Button, Container, Typography, InputAdornment, Divider, Grid, Link, Collapse, Alert, AlertTitle } from '@mui/material';
import AccountCircle from "@mui/icons-material/AccountCircle"
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import DownloadIcon from '@mui/icons-material/Download';
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom';
import { userAtom } from '../Atoms/userAtom';
import { notificationsAtom } from '../Atoms/notificationsAtom';
import { useCookies } from 'react-cookie';
import checkLogin from "../AxiosCalls/Auth/checkLogin"
import links from '../Data/Links';
import { LoadingButton } from '@mui/lab';
const axios = require('axios')

function LoginPage() {
    const navigate = useNavigate()
    const [user, setUser] = useRecoilState(userAtom)
    const [notifications, setNotifications] = useRecoilState(notificationsAtom)
    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [userCookie, setUserCookie] = useCookies(['user'])
    const [androidOpen, setAndroidOpen] = React.useState(true);

    const loginClicked = async (e) => {
        e.preventDefault();
        setLoading(true)
        let options = {
            method: 'post',
            url: links.login,
            data: {
                student_number: username,
                password: password,
            },
        }
        axios(options)
            .then((res) => {
                if (res.data.status === 'ok') {
                    setLoading(false);
                    setUserCookie('user', JSON.stringify(res.data.data.user))
                    setNotifications(res.data.data.notifications)
                    setUser(res.data.data.user)
                    navigate('/home/demands');
                } else {
                    setLoading(false);
                    if (res.data.message == "The student number field is required.") {
                        setError("وارد کردن شماره‌ی دانش‌جویی لازم است.");
                    } else if (res.data.message == "The password field is required.") {
                        setError("وارد کردن کلمه‌ی عبور لازم است.");
                    } else if (res.data.message == "نام کاربری یا رمز عبور نادرست می‌باشد") {
                        setError("شماره‌ی دانش‌جویی یا کلمه‌ی عبور اشتباه است.");
                    } else {
                        setError("خطایی رخ داده است.");
                    }
                }
            });
    }

    const registerClicked = () => navigate('/register');

    return (
        <>
            <Collapse in={androidOpen}>
                <div className="textCenter">
                    <Alert
                        sx={{ mt: 2 }}
                        style={{ maxWidth: '520px', borderRadius: '20', opacity: 0.8 }}
                        dir='ltr'
                        severity='info'
                        onClose={() => setAndroidOpen(false)}>
                        <AlertTitle dir='rtl'><span style={{ fontWeight: 'bold' }}>
                            نصب اپلیکیشن اندروید</span></AlertTitle>
                        <div dir='rtl'>
                            به منظور تسریع مشاهده‌ی درخواست‌های آموزشی شورای صنفی دانشکده‌ی مهندسی کامپیوتر، می‌توانید اپلیکیشن اندروید شورای صنفی را از طریق
                            <Link href="https://shora.taha7900.ir/Shora-App.apk" style={{ textDecoration: 'none' }}> این لینک </Link>
                            نصب نمایید.
                        </div>
                    </Alert>
                </div>
            </Collapse>
            <Container maxWidth="sm" alignitems="center" sx={{ marginTop: 4, marginBottom: 2 }}>
                <Card
                    sx={{ paddingY: 6, paddingX: 4 }}
                    style={{ borderRadius: 20 }}
                    className={"demand-card-bg"}>
                    <form onSubmit={loginClicked}>
                        <div className="textCenter">
                            <Typography variant='h4' sx={{ marginBottom: 6 }}><div style={{ fontWeight: 'bold', fontSize: 45, color: '#e55c00' }}>ورود به سامانه</div></Typography>
                        </div>
                        <TextField
                            variant='outlined'
                            placeholder='شماره‌ی دانش‌جویی'
                            fullWidth
                            onChange={(val) => setUsername(val.target.value)}
                            InputProps={{
                                inputProps: {
                                    style: { textAlign: 'right', },
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                )
                            }}
                            sx={{ marginBottom: 2 }} />
                        <TextField
                            variant='outlined'
                            type='password'
                            placeholder='رمز عبور'
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyIcon />
                                    </InputAdornment>
                                )
                            }}
                            onChange={(val) => setPassword(val.target.value)}
                            sx={{ marginBottom: 2 }} />
                        <div className="textCenter">
                            <Typography
                                color='error'
                                sx={{ marginBottom: 2 }}>
                                {error}
                            </Typography>
                        </div>
                        <LoadingButton loading={loading} variant='contained' type={'submit'} fullWidth onClick={loginClicked}><span style={{ fontSize: 20, fontWeight: 'bold' }}>ورود</span></LoadingButton>
                        <Divider sx={{ marginY: 2, fontFamily: "B Nazanin" }}> یا </Divider>
                        <Button variant='outlined' fullWidth href="/register"><span style={{ fontSize: 20, fontWeight: 'bold' }}>ثبت ‌نام</span></Button>

                        <Grid container justifyContent='center' sx={{ mt: 2 }}>
                            <Button href="/forgot-password" sx={{ mt: 2.5, mb: 0 }} startIcon={<VpnKeyIcon sx={{ ml: 1.5 }} />} variant='text'>
                                رمز عبورم را فراموش کرده‌ام
                            </Button>
                        </Grid>
                    </form>
                </Card>
                {/* <Grid container justifyContent='center' sx={{ mt: 2 }}>
                    <Link href="https://shora.taha7900.ir/Shora-App.apk">
                        <Button endIcon={<DownloadIcon sx={{ mr: 1 }} />} variant='text'>
                            دانلود اپلیکیشن اندروید
                        </Button>
                    </Link>
                </Grid> */}
            </Container>
        </>
    )
}

export default LoginPage