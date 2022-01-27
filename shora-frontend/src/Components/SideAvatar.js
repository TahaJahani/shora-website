import * as React from 'react'
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Stack from '@mui/material/Stack';
import { userAtom } from "../Atoms/userAtom"
import { useRecoilState } from 'recoil';
import { Typography, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from "react-router-dom"
import logout from "../AxiosCalls/Auth/logout"
import ChangePasswordForm from './SideDrawer/ChangePasswordForm';

function stringToColor(string) {
    let hash = 0;
    let i;
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            width: 64,
            height: 64,
            alignSelf: 'center',
            bgcolor: stringToColor(name),
        },
        children: <PersonIcon />,
        // children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export default function SideAvatar() {

    const [user, setUser] = useRecoilState(userAtom)
    const navigate = useNavigate()

    const [dialogData, setDialogData] = React.useState({
        isOpen: false,
        showSnackBar: false,
    })

    const logoutClicked = () => {
        logout(() => {
            setUser(null)
            navigate('/login')
        }, () => { })
    }

    const changePasswordClicked = () => {
        setDialogData({ ...dialogData, isOpen: true })
    }

    return (
        <div>
            <Stack direction="column" mt={2}>
                <Avatar {...stringAvatar(user.name + ' ' + user.surname)} mb={2}/>
                <Typography variant='h6' sx={{ alignSelf: 'center' }} my={2}>
                    {'خوش آمدید، ' + user.name}
                </Typography>
                <Button variant='text' onClick={changePasswordClicked}>
                    تغییر رمز عبور
                </Button>
                <Button variant='text' onClick={logoutClicked}>
                    خروج
                </Button>
            </Stack>
            <ChangePasswordForm
                open={dialogData.isOpen}
                onClose={() => { setDialogData({ ...dialogData, isOpen: false }) }}
                onSuccess={() => { setDialogData({ ...dialogData, isOpen: false, showSnackBar: true }) }} />
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={dialogData.showSnackBar}
                autoHideDuration={2000}
                onClose={() => setDialogData({ ...dialogData, showSnackBar: false })}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    رمز عبور با موفقیت تغییر کرد
                </Alert>
            </Snackbar>
        </div>
    );
}