import * as React from 'react'
import DemandItem from "../Components/Demands/DemandItem"
import AddDemandForm from "../Components/Demands/AddDemandForm"
import getDemands from '../AxiosCalls/Demands/getDemands'
import getSingleDemand from '../AxiosCalls/Demands/getSingleDemand'
import likeDemand from '../AxiosCalls/Demands/likeDemand'
import unlikeDemand from '../AxiosCalls/Demands/unlikeDemand'
import banUser from '../AxiosCalls/Demands/banUser'
import changeDemandStatus from '../AxiosCalls/Demands/changeDemandStatus'
import deleteDemand from '../AxiosCalls/Demands/deleteDemand'
import { Alert, ImageList, Backdrop, CircularProgress, Dialog, Fab, Grid, Pagination, Snackbar, Paper, IconButton, InputBase, Divider, Menu, MenuItem, AlertTitle, Collapse, Autocomplete, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add'
import { Box } from '@mui/system'
import { useParams } from "react-router-dom";
import getDemandCategories from '../AxiosCalls/DemandCategories/getDemandCategories'
import { useRecoilState } from 'recoil'
import { demandCategoryAtom } from '../Atoms/demandCategoryAtom'

export default function DemandsPage() {

    const { id } = useParams();

    const showSingleDemand = id && !isNaN(id);

    const allCategories = { id: 0, name: "همه‌ی درخواست‌ها" };

    const [demands, setDemands] = React.useState([])
    const [demandsCategories, setDemandsCategories] = useRecoilState(demandCategoryAtom)
    const [selectedCategory, setSelectedCategory] = React.useState(allCategories.id)
    const [singleDemand, setSingleDemand] = React.useState();
    const [pageData, setPageData] = React.useState({
        currentPage: 1,
        lastPage: 1,
        isLoading: true,
    });
    const [toSearch, setToSearch] = React.useState('')
    const [loading, setLoading] = React.useState([])
    const [dialogOpen, setDialogOpen] = React.useState(false)
    const [likeDialogOpen, setLikeDialogOpen] = React.useState(false)
    const [popupData, setPopUpData] = React.useState({
        open: false,
        message: '',
        color: 'success',
    })
    const [warningOpen, setWarningOpen] = React.useState(true);

    const getDemandsOfPage = (page, search) => {
        getDemands({ page: page, search: search, category_id: selectedCategory }, (res) => {
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
        setDemands([])
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

        const onChangeStatus = (selected) => {
            changeDemandStatus({
                demand_id: demand.id,
                status: selected
            }, () => {
                showPopUp('با موفقیت انجام شد', true)
                setDemands(demands.map(item => {
                    if (item.id === demand.id)
                        return { ...item, status: selected }
                    return item
                }))
            }, (err) => showPopUp(err, false))
        }

        return { onBan, onDelete, onLike, onChangeStatus }
    }

    React.useEffect(() => {
        if (showSingleDemand)
            getSingleDemand(id, (res) => {
                setSingleDemand(res.data.demand);
                document.body.style.overflow = 'auto';
            }, () => { })
        getDemandCategories(() => { }, () => { })
    }, [])

    React.useEffect(() => {
        changePage(1)
    }, [selectedCategory])

    const filterDemands = () => {
        return demands.filter(demand => (toSearch == '') || demand.title.toLowerCase().includes(toSearch.toLowerCase()) || demand.category.toLowerCase().includes(toSearch.toLowerCase()) || demand.body.toLowerCase().includes(toSearch.toLowerCase())) || [];
    } 

    return (
        <>
        {/* <div className="textCenter">
                <Collapse in={warningOpen}>
                    <Alert
                        // sx={{ my: 2, width: '100%' }}
                        sx={{ my: 1, width: { md: '50%', } }}
                        dir='ltr'
                        severity='error'
                        onClose={() => setWarningOpen(false)}>
                        <AlertTitle dir='rtl' style={{marginRight: 10}} >توجه</AlertTitle>
                        <div dir='rtl' style={{marginRight: 10}}>
                            لایک کردن یک درخواست به منزله این است که شما درخواست مشابه را دارید و در صورت نیاز، شماره دانشجویی، نام و نام خانوادگی شما در اختیار نهادهای مرتبط قرار خواهد گرفت
                        </div>
                    </Alert>
                </Collapse>
        </div> */}
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
            <Dialog
                dir='rtl'
                open={likeDialogOpen}
                onClose={() => setLikeDialogOpen(false)}
                fullWidth={true}
                maxWidth='md'>
                Hi
            </Dialog>
            <Grid container alignContent='center' sx={{ mb: 2 }} spacing={2}>
                <Grid item xs={6} sm={3} md={6}>
                    <Paper
                        variant='outlined'
                        sx={{ p: '5px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
                        <InputBase
                            onChange={(e) => setToSearch(e.target.value)}
                            value={toSearch}
                            sx={{ mr: 1, flex: 1 }}
                            placeholder="جست‌وجو"
                            inputProps={{ 'aria-label': 'جست‌وجو' }} />
                        <IconButton
                            sx={{ p: '10px' }}
                            onClick={() => {
                                getDemandsOfPage(1, toSearch)
                            }}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3} md={6}>
                    <TextField
                        value={selectedCategory}
                        sx={{ width: '100%', backgroundColor: 'white' }}
                        select
                        onChange={(e) => {setSelectedCategory(e.target.value)}} >
                        {[allCategories, ...demandsCategories].map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            {showSingleDemand && singleDemand &&
                <div>
                    <DemandItem
                        variant='elevation'
                        sx={{ background: '#42a5f515' }}
                        key={singleDemand.id}
                        demand={singleDemand}
                        loading={loading.includes(singleDemand.id)}
                        onBanClicked={demandActionsGenerator(singleDemand).onBan}
                        onChangeStatusClicked={demandActionsGenerator(singleDemand).onChangeStatus}
                        onDeleteClicked={demandActionsGenerator(singleDemand).onDelete}
                        onLikeClicked={demandActionsGenerator(singleDemand).onLike} />
                    <Divider sx={{ my: 2 }}>
                        سایر درخواست‌ها
                    </Divider>
                </div>
            }
            <Grid container justifyContent="center">
                {pageData.lastPage !== 1 &&
                    <Pagination count={pageData.lastPage} onChange={changePage} size="large" shape="rounded" sx={{ marginBottom: 2 }} />}
            </Grid>

            <Box sx={{ overflowY: 'scroll', height: '100%' }}>
            <ImageList variant="masonry" cols={2} gap={1} dir={"rtl"}>
                {demands.map((demand) => {
                    const { onBan, onDelete, onLike, onChangeStatus } = demandActionsGenerator(demand)
                    return (
                        // <Grid item xs={4} sm={8} md={6} key={demand.id}>
                            <DemandItem  dir={"rtl"}
                                key={demand.id}
                                demand={demand}
                                loading={loading.includes(demand.id)}
                                onBanClicked={onBan}
                                onChangeStatusClicked={onChangeStatus}
                                onDeleteClicked={onDelete}
                                onLikeClicked={onLike} />
                        // </Grid>
                    )
                })}
            </ImageList>
            </Box>

            {/* <Grid container spacing={{ xs: 2, md: 1.2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {demands.map((demand) => {
                    const { onBan, onDelete, onLike, onChangeStatus } = demandActionsGenerator(demand)
                    return (
                        <Grid item xs={4} sm={8} md={6} key={demand.id}>
                            <DemandItem
                                key={demand.id}
                                demand={demand}
                                loading={loading.includes(demand.id)}
                                onBanClicked={onBan}
                                onChangeStatusClicked={onChangeStatus}
                                onDeleteClicked={onDelete}
                                onLikeClicked={onLike} />
                        </Grid>
                    )
                })}
            </Grid> */}
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
        </>
    )
}