import * as React from 'react';
import { Card, Typography, CardContent, Grid, TextField, CardActions, MenuItem } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { styled } from "@mui/material/styles";
import addDemand from "../../AxiosCalls/Demands/addDemand"
import { useRecoilState } from 'recoil'
import { demandCategoryAtom } from '../../Atoms/demandCategoryAtom'

const FullWidthTextField = styled(TextField)(() => ({
    width: '100%'
}))

export default function AddDemandForm({ sx, onDemandAdded }) {

    const [loading, setLoading] = React.useState(false)
    const [body, setBody] = React.useState('');
    const [error, setError] = React.useState()
    const [demandsCategories, setDemandsCategories] = useRecoilState(demandCategoryAtom)
    const [selectedCategory, setSelectedCategory] = React.useState('')

    React.useEffect(() => {
        if (demandsCategories.length > 0) {
            setSelectedCategory(demandsCategories[0].id)
        } 
    });

    const submitClicked = () => {
        setLoading(true)
        console.log({ body: body, category_id: selectedCategory })
        addDemand({ body: body, category_id: selectedCategory }, (res) => {
            setLoading(false)
            setBody('')
            onDemandAdded(res.data.demand)
        }, (err) => {
            setError(err)
            setLoading(false)
        })
    }

    return (
        <Card variant="" component='form' sx={{ ...sx, padding: 2, margin: 2 }} style={{borderRadius: 20}}>
            <Typography variant='h5' sx={{mr: 2}}>
                ثبت درخواست جدید
            </Typography>
            <CardContent>
                <FullWidthTextField
                    multiline rows={5}
                    inputProps={{ maxLength: 500 }}
                    helperText={`500 / ${body.length}`}
                    placeholder="متن درخواست"
                    value={body}
                    onChange={(e) => { setError(''); setBody(e.target.value) }}
                    sx={{ marginBottom: 2 }} />
                {error && <Typography color="error">{error}</Typography>}
            </CardContent>
            <CardActions>
                <Grid container justifyContent='space-between' alignItems='end' spacing={2}>
                    <Grid item xs={12} sm={3} md={4}>
                        <span dir="rtl">
                        <FullWidthTextField
                            value={selectedCategory}
                            select
                            onChange={(e) => { setSelectedCategory(e.target.value) }}
                            // className={"option-picker"}
                            >
                            {demandsCategories.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </FullWidthTextField>
                        </span>
                    </Grid>
                    {/* <Grid item xs={12} md={1} sm={2}>
                    <LoadingButton sx={{width: '100%'}} loading={loading} variant='contained' onClick={submitClicked}>
                        ثبت
                    </LoadingButton>
                    </Grid> */}
                    <Grid item xs={12} sm={1} md={1} justifyItems='flex-end' className={"submit-button"}>
                        <LoadingButton loading={loading} variant="contained" sx={{ width: '100%' }} onClick={submitClicked}>
                            <span style={{fontSize: 20, fontWeight: 'bold'}}>ثبت</span>
                        </LoadingButton>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}