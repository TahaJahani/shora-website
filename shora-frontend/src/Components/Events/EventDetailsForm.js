import * as React from 'react'
import { styled } from "@mui/material/styles";
import { Box, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const FullWidthTextField = styled(TextField)(() => ({
    width: '100%'
}))

const formatDate = (date) => {
    if (date)
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    else return ''
}

export default function EventDetailsForm({ sx, event, isReadOnly = true, onSubmit, loading }) {

    const initialData = {
        name: event ? event.name : '',
        start_at: event ? formatDate(new Date(event.start_at)) : formatDate(new Date()),
        finish_at: event ? formatDate(new Date(event.finish_at)) : formatDate(new Date()),
        fee: event ? event.fee : '',
        gift: event ? event.gift : '',
        description: event ? event.description : '',
    }

    const [data, setData] = React.useState(initialData);

    let xs = isReadOnly ? 6 : 12
    let md = 4

    return (
        <Box sx={sx}>
            <Grid container mb={2}>
                <Grid item xs={12} md={8}>
                {isReadOnly ?
                        <div>
                            <Typography>نام رویداد</Typography>
                            <Typography>{data.name}</Typography>
                        </div>
                        :
                        <FullWidthTextField
                            label='نام رویداد'
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            value={data.name} />
                    }
                </Grid>
            </Grid>
            <Grid container spacing={2} mb={2}>
                <Grid item xs={xs} md={md}>
                    {isReadOnly ?
                        <div>
                            <Typography>زمان شروع</Typography>
                            <Typography>{data.start_at.toLocaleDateString('fa-IR')}</Typography>
                        </div>
                        :
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="زمان شروع"
                                inputFormat="dd/MM/yyyy"
                                value={data.start_at}
                                onChange={(newValue) => { setData({ ...data, start_at: formatDate(newValue) }) }}
                                renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                            />
                        </LocalizationProvider>
                    }
                </Grid>
                <Grid item xs={xs} md={md}>
                    {isReadOnly ?
                        <div>
                            <Typography>زمان پایان</Typography>
                            <Typography>{data.finish_at.toLocaleDateString('fa-IR')}</Typography>
                        </div>
                        :
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="زمان پایان"
                                inputFormat="dd/MM/yyyy"
                                value={data.finish_at}
                                onChange={(newValue) => { setData({ ...data, finish_at: formatDate(newValue) }) }}
                                renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                            />
                        </LocalizationProvider>
                    }
                </Grid>
            </Grid>
            <Grid container spacing={2} mb={2}>
                <Grid item xs={xs} md={md}>
                    {isReadOnly ?
                        <div>
                            <Typography>هزینه ثبت نام</Typography>
                            <Typography>{data.fee}</Typography>
                        </div>
                        :
                        <FullWidthTextField
                            label='هزینه ثبت نام'
                            type='number'
                            disabled={event && event.users.length > 0}
                            onChange={(e) => setData({ ...data, fee: e.target.value })}
                            value={data.fee} />
                    }
                </Grid>
                <Grid item xs={xs} md={md}>
                    {isReadOnly ?
                        <div>
                            <Typography>جایزه مسابقه</Typography>
                            <Typography>{data.gift}</Typography>
                        </div>
                        :
                        <FullWidthTextField
                            label="جایزه مسابقه"
                            type='number'
                            onChange={e => setData({ ...data, gift: e.target.value })}
                            value={data.gift} />
                    }
                </Grid>
            </Grid>
            <Grid container mb={2}>
                <Grid item xs={12} md={8}>
                    {isReadOnly ?
                        <div>
                            <Typography>توضیحات</Typography>
                            <Typography>{data.description}</Typography>
                        </div>
                        :
                        <FullWidthTextField
                            label="توضیحات"
                            multiline
                            rows={3}
                            onChange={e => setData({ ...data, description: e.target.value })}
                            value={data.description} />
                    }
                </Grid>
            </Grid>
            {!isReadOnly && <Grid container justifyContent='flex-end'>
                <Grid item xs={12} sm={1} md={1} justifyItems='flex-end'>
                    <LoadingButton loading={loading} variant="contained" sx={{ width: '100%' }} onClick={() => onSubmit(data)}>
                        ثبت
                    </LoadingButton>
                </Grid>
            </Grid>}
        </Box>
    )
}