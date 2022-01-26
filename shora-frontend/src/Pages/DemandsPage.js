import * as React from 'react'
import DemandItem from "../Components/Demands/DemandItem"
import AddDemandForm from "../Components/Demands/AddDemandForm"
import getDemands from '../AxiosCalls/Demands/getDemands'
import likeDemand from '../AxiosCalls/Demands/likeDemand'
import unlikeDemand from '../AxiosCalls/Demands/unlikeDemand'
import banUser from '../AxiosCalls/Demands/banUser'
import { Box, Button, Grid, Pagination, TextField, Typography } from '@mui/material'

export default function DemandsPage() {

    const [demands, setDemands] = React.useState([])
    const [pageData, setPageData] = React.useState({
        currentPage: 1,
        lastPage: 1,
    });

    const [loading, setLoading] = React.useState([])
    const [banLoading, setBanLoading] = React.useState([])

    const getDemandsOfPage = (page) => {
        getDemands({ page: page }, (res) => {
            setPageData({
                currentPage: 1,
                lastPage: res.data.last_page
            })
            setDemands(res.data.demands)
        }, () => { })
    }

    const changePage = (event, value) => {
        setPageData({ ...pageData, currentPage: value })
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

    React.useEffect(() => {
        getDemandsOfPage(1)
    }, [])

    return (
        <div>
            <AddDemandForm sx={{ marginBottom: 2 }} onDemandAdded={(added) => setDemands([added, ...demands])} />
            <Grid container justifyContent="center">
                {pageData.lastPage != 1 &&
                    <Pagination count={pageData.lastPage} onChange={changePage} size="large" shape="rounded" sx={{ marginBottom: 2 }} />}
            </Grid>
            {/* TODO */}
            {/* <Box>
                <TextField label="جستجو" variant='outlined'/>
                
            </Box> */}
            {demands.map((demand) => {
                const onLike = () => {
                    const toCall = demand.is_liked ? unlikeDemand : likeDemand;
                    setLoading([...loading, demand.id])
                    toCall(demand.id, () => {
                        toggleLikedInDemand(demand.id)
                        setLoading(loading.filter((id) => id !== demand.id))
                    }, () => { })
                }

                const onBan = () => {
                    setBanLoading([...banLoading, demand.id]);
                    banUser(demand.id, () => {
                        setBanLoading(banLoading.filter((id) => id !== demand.id))
                    }, () => {})
                }
                return (
                    <DemandItem
                        key={demand.id}
                        demand={demand}
                        banLoading={banLoading.includes(demand.id)}
                        loading={loading.includes(demand.id)}
                        onBanClicked={onBan}
                        onLikeClicked={onLike} />
                )
            })}
        </div>
    )
}