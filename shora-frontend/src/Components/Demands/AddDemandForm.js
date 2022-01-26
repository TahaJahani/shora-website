import * as React from 'react';
import { Card, Typography, CardContent, Grid, TextField, CardActions } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { styled } from "@mui/material/styles";
import addDemand from "../../AxiosCalls/Demands/addDemand"

const FullWidthTextField = styled(TextField)(() => ({
    width: '100%'
}))

export default function AddDemandForm({ sx, onDemandAdded }) {

    const [loading, setLoading] = React.useState(false)
    const [body, setBody] = React.useState();
    const [error, setError] = React.useState()

    const submitClicked = () => {
        setLoading(true)
        addDemand({ body: body }, (res) => {
            setLoading(false)
            setBody('')
            onDemandAdded(res.data.demand)
        }, (err) => { 
            setError(err) 
            setLoading(false)
        })
    }

    return (
        <Card sx={{ ...sx, padding: 2 }} elevation={2}>
            <Typography variant='h6'>
                ثبت درخواست جدید
            </Typography>
            <CardContent>
                <FullWidthTextField
                    multiline rows={5}
                    label="متن درخواست"
                    value={body}
                    onChange={(e) => {setError(''); setBody(e.target.value)}}
                    sx={{ marginBottom: 2 }} />
                {error && <Typography color="error">{error}</Typography>}
            </CardContent>
            <CardActions>
                <Grid container justifyContent='flex-end'>
                    <LoadingButton loading={loading} variant='contained' onClick={submitClicked}>
                        ثبت
                    </LoadingButton>
                </Grid>
            </CardActions>
        </Card>
    )
}