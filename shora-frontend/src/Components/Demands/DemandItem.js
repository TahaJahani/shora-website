import * as React from 'react'
import { Card, CardActionArea, CardActions, CardContent, CardHeader, Typography, Grid, IconButton, Menu, MenuItem } from '@mui/material'
import { LoadingButton } from "@mui/lab"
import translate from "../../Helpers/translate"
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BlockIcon from '@mui/icons-material/Block';
import { hasAccess } from "../../Helpers/UserHelper"

export default function DemandItem({ demand, onLikeClicked, loading, onBanClicked, onDeleteClicked }) {

    let statusColor = demand.status === 'rejected' ? 'error' :
        demand.status === 'accepted' ? 'green' : 'orange'

    const isAdmin = hasAccess(['owner', 'admin']);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMoreClicked = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClosed = () => {
        setAnchorEl(null);
    };

    return (
        <Card variant='outlined' sx={{ padding: 2, marginBottom: 2 }}>
            <CardHeader
                action={ isAdmin && 
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleMoreClicked}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={
                    <Typography variant='subtitle'>
                        {"ثبت شده در تاریخ " + new Date(demand.created_at).toLocaleDateString("fa-IR")}
                    </Typography>
                }
                subheader={
                    <Typography variant='subtitle2' fontWeight="bold" color={statusColor}>
                        {"وضعیت: " + translate(demand.status)}
                    </Typography>
                }
            />
            <CardContent>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClosed}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => {onBanClicked(); handleMenuClosed()}}>مسدود کردن کاربر</MenuItem>
                    <MenuItem onClick={() => {onDeleteClicked(); handleMenuClosed()}}>حذف درخواست</MenuItem>
                </Menu>
                <Typography variant='h6' sx={{ marginTop: 2 }}>
                    {demand.body}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container justifyContent="flex-end">
                    <LoadingButton loading={loading} onClick={onLikeClicked} variant='outlined' endIcon={demand.is_liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}>
                        <Typography fontFamily="arial" fontSize="12" sx={{ paddingLeft: 2, paddingRight: 1 }}>
                            {demand.likes_count}
                        </Typography>
                    </LoadingButton>
                </Grid>
            </CardActions>
        </Card>
    )
}