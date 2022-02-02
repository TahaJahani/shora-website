import * as React from 'react'
import DemandItem from "../Components/Demands/DemandItem"
import AddDemandForm from "../Components/Demands/AddDemandForm"
import getDemands from '../AxiosCalls/Demands/getDemands'
import likeDemand from '../AxiosCalls/Demands/likeDemand'
import unlikeDemand from '../AxiosCalls/Demands/unlikeDemand'
import banUser from '../AxiosCalls/Demands/banUser'
import deleteDemand from '../AxiosCalls/Demands/deleteDemand'
import { Alert, Backdrop, Button, CircularProgress, Dialog, Fab, Grid, Pagination, Snackbar, TextField, Paper, IconButton, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add'
import { Box } from '@mui/system'

export default function DemandsPage() {

    const [demands, setDemands] = React.useState([])
    const [pageData, setPageData] = React.useState({
        currentPage: 1,
        lastPage: 1,
        isLoading: true,
    });
    const [toSearch, setToSearch] = React.useState('')
    const [loading, setLoading] = React.useState([])
    const [dialogOpen, setDialogOpen] = React.useState(false)
    const [popupData, setPopUpData] = React.useState({
        open: false,
        message: '',
        color: 'success',
    })

    const getDemandsOfPage = (page, search) => {
        getDemands({ page: page, search: search }, (res) => {
            setPageData({
                currentPage: page,
                lastPage: res.data.last_page,
                isLoading: false,
            })
            setDemands(res.data.demands)
            document.body.style.overflow = 'auto';
        }, () => { })
    }

    const changePage = (event, value) => {
        setPageData({ ...pageData, currentPage: value, isLoading: true })
        getDemandsOfPage(value)
    }

    const toggleLikedInDemand = (id) => {
        let changedDemands = demands.map((item) => {
            let newItem = { ...item }
            if (newItem.id === id) {
                newItem.is_liked = !newItem.is_liked;
                newItem.likes_count += newItem.is_liked ? 1 : -1;
            }
            return newItem;
        })
        setDemands(changedDemands)
    }

    const showPopUp = (message, isSuccess) => {
        setPopUpData({
            open: true,
            message: message,
            color: isSuccess ? 'success' : 'error',
        });
    }

    const demandActionsGenerator = (demand) => {
        const onLike = () => {
            const toCall = demand.is_liked ? unlikeDemand : likeDemand;
            setLoading([...loading, demand.id])
            toCall(demand.id, () => {
                toggleLikedInDemand(demand.id)
                setLoading(loading.filter((id) => id !== demand.id))
            }, () => { })
        }

        const onBan = () => {
            banUser(
                demand.id,
                (res) => showPopUp('کاربر با موفقیت مسدود شد', true),
                (err) => showPopUp(err, false)
            )
        }

        const onDelete = () => {
            deleteDemand(
                demand.id,
                () => {
                    showPopUp('با موفقیت حذف شد', true)
                    setDemands(demands.filter(item => item.id !== demand.id))
                },
                (err) => showPopUp(err, false))
        }

        return { onBan, onDelete, onLike }
    }

    React.useEffect(() => {
        getDemandsOfPage(1)
    }, [])

    return (
        <Box>
            <Dialog
                dir='rtl'
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                fullWidth={true}
                maxWidth='md'>
                <AddDemandForm
                    onDemandAdded={(added) => {
                        setDemands([added, ...demands])
                        setDialogOpen(false);
                    }} />
            </Dialog>
            <Grid container alignContent='center' sx={{ mb: 2 }}>
                <Paper
                    variant='outlined'
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: { xs: '100%', sm: '400px' } }}>
                    <InputBase
                        onChange={(e) => setToSearch(e.target.value)}
                        value={toSearch}
                        sx={{ mr: 1, flex: 1 }}
                        placeholder="جستجو"
                        inputProps={{ 'aria-label': 'جستجو' }} />
                    <IconButton
                        sx={{ p: '10px' }}
                        onClick={() => {
                            getDemandsOfPage(1, toSearch)
                        }}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Grid>
            <Grid container justifyContent="center">
                {pageData.lastPage != 1 &&
                    <Pagination count={pageData.lastPage} onChange={changePage} size="large" shape="rounded" sx={{ marginBottom: 2 }} />}
            </Grid>
            <div>
                {demands.map((demand) => {
                    const { onBan, onDelete, onLike } = demandActionsGenerator(demand)
                    return (
                        <DemandItem
                            key={demand.id}
                            demand={demand}
                            loading={loading.includes(demand.id)}
                            onBanClicked={onBan}
                            onDeleteClicked={onDelete}
                            onLikeClicked={onLike} />
                    )
                })}
            </div>
            <Snackbar
                open={popupData.open}
                autoHideDuration={15000}
                onClose={() => setPopUpData({ ...popupData, open: false })}>
                <Alert
                    severity={popupData.color}
                    sx={{ width: '100%' }}>
                    {popupData.message}
                </Alert>
            </Snackbar>
            <Fab
                sx={{
                    margin: 1,
                    position: "fixed",
                    bottom: 8,
                    left: 8
                }}
                onClick={() => setDialogOpen(true)}
                variant='extended'
                color='primary'>
                افزودن درخواست
                <AddIcon sx={{ ml: 1 }} />
            </Fab>
            <Backdrop
                invisible={true}
                open={pageData.isLoading}>
                <CircularProgress color="primary" />
            </Backdrop>
        </Box>
    )
}