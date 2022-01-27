import * as React from 'react';
import { TextField, Card, Button, Container, Typography, InputAdornment, Divider, Grid, Link } from '@mui/material';
import AccountCircle from "@mui/icons-material/AccountCircle"
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import DownloadIcon from '@mui/icons-material/Download';
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom';
import { userAtom } from '../Atoms/userAtom';
import { useCookies } from 'react-cookie';
import checkLogin from "../AxiosCalls/Auth/checkLogin"
import links from '../Data/Links';
import { LoadingButton } from '@mui/lab';
const axios = require('axios')

function LoginPage() {
    const navigate = useNavigate()
    const [user, setUser] = useRecoilState(userAtom)
    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [userCookie, setUserCookie] = useCookies(['user'])

    const loginClicked = async () => {
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
                    setUser(res.data.data.user)
                    navigate('/home');
                } else {
                    setLoading(false);
                    setError(res.data.message);
                }
            });
    }

    const registerClicked = () => navigate('/register');

    return (
        <Container maxWidth="sm" alignitems="center" sx={{ marginTop: 8 }}>
            <Card component='form' variant='outlined' sx={{ paddingY: 6, paddingX: 4 }}>
                <Typography variant='h4' sx={{ marginBottom: 6 }}>ورود</Typography>
                <TextField
                    variant='outlined'
                    label='شماره دانشجویی'
                    fullWidth
                    onChange={(val) => setUsername(val.target.value)}
                    InputProps={{
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
                    label='رمز عبور'
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
                <Typography
                    color='error'
                    sx={{ marginBottom: 4 }}>
                    {error}
                </Typography>
                <LoadingButton loading={loading} variant='contained' fullWidth onClick={loginClicked}>ورود</LoadingButton>
                <Divider sx={{ marginY: 2, fontFamily: "B Nazanin" }}> یا </Divider>
                <Button variant='outlined' fullWidth onClick={registerClicked}>بازیابی رمز عبور</Button>
            </Card>
            <Grid container justifyContent='center' sx={{ mt: 2 }}>
                <Link href="https://shora.taha7900.ir/Shora-App.apk">
                    <Button endIcon={<DownloadIcon sx={{ mr: 1 }} />} variant='text'>
                        دانلود اپلیکیشن اندروید
                    </Button>
                </Link>
            </Grid>
        </Container>
    )
}

export default LoginPage