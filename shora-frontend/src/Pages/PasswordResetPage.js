import * as React from 'react';
import { TextField, Card, Button, Container, Typography, FormControl, InputLabel, Input, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import resetPassword from "../AxiosCalls/Auth/resetPassword";
import { useParams } from "react-router-dom";
const axios = require('axios')

function PasswordResetPage() {
    const navigate = useNavigate()
    const { hash } = useParams();

    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswrodConfirm] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const resetClicked = async () => {
        setLoading(true);
        resetPassword({
            hash: hash,
            password: password,
            password_confirmation: passwordConfirm,
        }, () => {
            setLoading(false)
            setMessage('رمز عبور شما با موفقیت بازنشانی شد');
            setTimeout(() => navigate('/login'), 1500);
        }, (err) => {
            setLoading(false)
            setError(err)
        })
    }

    return (
        <Container maxWidth="sm" alignitems="center" sx={{ marginTop: 8 }}>
            <Card component='form' variant='outlined' sx={{ paddingY: 6, paddingX: 4 }}>
                <div className="textCenter">
                    <Typography variant='h4' sx={{ marginBottom: 6 }}><div style={{fontWeight: 'bold', fontSize: 45, color: '#e55c00'}}>بازیابی رمز عبور</div></Typography>
                </div>
                <TextField
                    variant='outlined'
                    label='رمز عبور جدید'
                    fullWidth
                    type='password'
                    value={password}
                    onChange={(val) => setPassword(val.target.value)}
                    sx={{ marginBottom: 2 }} />
                <TextField
                    variant='outlined'
                    type='password'
                    label='تکرار رمز عبور جدید'
                    fullWidth
                    value={passwordConfirm}
                    onChange={(val) => setPasswrodConfirm(val.target.value)}
                    sx={{ marginBottom: 2 }} />
                <Typography
                    color='error'
                    sx={{ marginBottom: 4 }}>
                    {error}
                </Typography>
                <Typography
                    color='green'
                    sx={{ marginBottom: 4 }}>
                    {message}
                </Typography>
                <LoadingButton
                    variant='contained'
                    loading={loading}
                    fullWidth
                    onClick={resetClicked}>
                    بازنشانی
                </LoadingButton>
            </Card>
        </Container>
    )
}

export default PasswordResetPage