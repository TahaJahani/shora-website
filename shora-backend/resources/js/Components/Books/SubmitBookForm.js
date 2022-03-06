import { TextField, Card, Autocomplete, Grid, Typography } from "@mui/material";
import * as React from "react"
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import addBook from "../../AxiosCalls/Books/addBook"

const rentableTypes = ['locker']//TODO: , 'book']

const FullWidthAutoComplete = styled(Autocomplete)(() => ({
    width: '100%',
}))

const FullWidthTextField = styled(TextField)(() => ({
    width: '100%'
}))

export default function SubmitBookForm({ id, onSubmit }) {

    const initialData = {
        id: id,
        name: '',
        pages: '',
        bookcase: '',
        shelf: '',
    }
    const [data, setData] = React.useState(initialData);
    const [error, setError] = React.useState()
    const [loading, setLoading] = React.useState(false)

    const submitClicked = () => {
        if (!data.name)
            setError('فیلد نام کتاب اجباری است');
        else if (!data.pages)
            setError('فیلد تعداد صفحات اجباری است');
        else if (!data.bookcase)
            setError('فیلد شماره کتابخانه اجباری است')
        else if (!data.shelf)
            setError('فیلد شماره قفسه اجباری است')
        else {
            setLoading(true)
            addBook(data, (res) => {
                onSubmit(res.data.book)
            }, (err) => {setError(err); setLoading(false)})
        }
    }

    return (
        <Card variant="" component='form' sx={{ padding: 2, margin: 2 }} style={{ borderRadius: 20 }}>
            <Typography variant="h5">
                ثبت کتاب جدید
            </Typography>
            <Grid container spacing={2} my={2}>
                <Grid item xs={12} sm={3} md={3}>
                    <FullWidthTextField
                        label="نام کتاب"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })} />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                    <FullWidthTextField
                        label="تعداد صفحات"
                        type='number'
                        value={data.pages}
                        onChange={(e) => setData({ ...data, pages: e.target.value })} />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                    <FullWidthTextField
                        label="شماره کتابخانه"
                        value={data.bookcase}
                        onChange={(e) => setData({ ...data, bookcase: e.target.value })} />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                    <FullWidthTextField
                        type='number'
                        label="شماره قفسه"
                        value={data.shelf}
                        onChange={(e) => setData({ ...data, shelf: e.target.value })} />
                </Grid>
            </Grid>
            <Grid container color='red'>
                {error}
            </Grid>
            <Grid container justifyContent='flex-end' sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={1} md={1} justifyItems='flex-end'>
                    <LoadingButton loading={loading} variant="contained" sx={{ width: '100%' }} onClick={submitClicked}>
                        <span style={{ fontSize: 20, fontWeight: 'bold' }}>ثبت</span>
                    </LoadingButton>
                </Grid>
            </Grid>
        </Card>
    )
}