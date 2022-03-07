import * as React from 'react';
import { Card, Typography, CardContent, Grid, TextField, CardActions, MenuItem, Dialog } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { styled } from "@mui/material/styles";
import addReport from '../../AxiosCalls/ReportProblems/addReport'

const FullWidthTextField = styled(TextField)(() => ({
    width: '100%'
}))

export default function SubmitProblemForm({ sx, onSuccess, onFailure, reportable, open }) {

    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState()
    const [data, setData] = React.useState({
        reportable_id: reportable.id,
        reportable_type: reportable.type,
        description: '',
    });

    const submitClicked = () => {
        setLoading(true)
        addReport(data, (res) => {
            setLoading(false)
            setData({...data, description: ''})
            onSuccess()
        }, (err) => {
            setError(err)
            setLoading(false)
            onFailure()
        })
    }

    return (
        <Dialog open={open} onClose={onFailure} fullWidth maxWidth='md'>
            <Card variant="" component='form' sx={{ ...sx, padding: 2, margin: 2 }} style={{ borderRadius: 20 }}>
                <Typography variant='h5' sx={{ mr: 2 }}>
                    {'گزارش مشکل'}
                </Typography>
                <CardContent>
                    <FullWidthTextField
                        multiline rows={4}
                        inputProps={{ maxLength: 250 }}
                        helperText={`250 / ${data.description.length}`}
                        placeholder="توضیحات مشکل"
                        value={data.description}
                        onChange={(e) => { setError(''); setData({ ...data, description: e.target.value }) }}
                        sx={{ marginBottom: 2 }} />
                    {error && <Typography color="error">{error}</Typography>}
                </CardContent>
                <CardActions>
                    <Grid container justifyContent='space-between' alignItems='end' spacing={2}>
                        <Grid item xs={12} sm={1} md={1} justifyItems='flex-end' className={"submit-button"}>
                            <LoadingButton loading={loading} variant="contained" sx={{ width: '100%' }} onClick={submitClicked}>
                                <span style={{ fontSize: 20, fontWeight: 'bold' }}>ثبت</span>
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Dialog>
    )
}