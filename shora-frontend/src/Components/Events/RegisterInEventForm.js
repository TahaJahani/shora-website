import { Card, CardContent, Grid, Typography } from '@mui/material';
import SearchStudentNumberTextField from "../SearchStudentNumberTextField"
import AddUserDialog from "../AddUserDialog"
import * as React from 'react';
import { LoadingButton } from '@mui/lab';
import registerUserInEvent from '../../AxiosCalls/Events/registerUserInEvent';
import registerUser from "../../AxiosCalls/User/registerUser"

export default function RegisterInEventForm({ sx, event, onSuccess }) {

    const [userId, setUserId] = React.useState(null)
    const [dialogOpen, setDialogOpen] = React.useState(false)
    const [dialogLoading, setDialogLoading] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const submitClicked = () => {
        setLoading(true)
        let data = {
            user_id: userId,
            event_id: event.id
        }
        registerUserInEvent(data, (res) => { setLoading(false); onSuccess(res.data.user) }, () => { });
    }

    return (
        <Card variant='outlined' sx={{ ...sx, padding: 2 }}>
            <Typography variant='h6'>
                ثبت‌نام کاربر
            </Typography>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={4}>
                        <SearchStudentNumberTextField
                            value={userId}
                            onChange={(id) => setUserId(id)}
                            onNotFound={() => setDialogOpen(true)} />
                    </Grid>
                    <Grid item xs={6} md={4} display='flex' alignItems='center'>
                        <LoadingButton loading={loading} variant='contained' onClick={submitClicked}>
                            ثبت
                        </LoadingButton>
                    </Grid>
                </Grid>
            </CardContent>

            <AddUserDialog
                open={dialogOpen}
                loading={dialogLoading}
                onSubmit={(data) => {
                    //TODO
                    setDialogLoading(true)
                    registerUser(data, (res) => {
                        setDialogOpen(false)
                        setDialogLoading(false)
                    }, (msg) => { console.log(msg) })
                }}
                onClose={() => { setDialogOpen(false) }} />
        </Card>
    )
}