import * as React from 'react'
import { Card, CardActionArea, CardActions, CardContent, CardHeader, Typography, Grid, IconButton, Menu, MenuItem } from '@mui/material'
import { NestedMenuItem } from 'mui-nested-menu'
import { LoadingButton } from "@mui/lab"
import translate from "../../Helpers/translate"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BlockIcon from '@mui/icons-material/Block';
import { hasAccess } from "../../Helpers/UserHelper"

export default function DemandItem({ demand, onLikeClicked, loading, variant = 'outlined', sx, onBanClicked, onDeleteClicked, onChangeStatusClicked }) {

    let statusColor = demand.status === 'rejected' ? 'error' :
        demand.status === 'accepted' ? 'green' : 'orange'

    let statusChangeButtons = ['accepted', 'rejected', 'pending'].filter(item => item !== demand.status)

    const isAdmin = hasAccess(['owner', 'admin']);

    const [contextMenu, setContextMenu] = React.useState(null);
    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX - 2,
                    mouseY: event.clientY - 4,
                }
                : null,
        );
    }

    const handleCloseContextMenu = () => {
        setContextMenu(null);
    };

    const getDemandLink = () => process.env.REACT_APP_BASE_FRONT_URL + `home/demands/${demand.id}`

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMoreClicked = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClosed = () => {
        setAnchorEl(null);
    };

    return (
        <Card variant={variant} sx={{ ...sx, padding: 2, marginBottom: 2 }} onContextMenu={handleContextMenu}>
            <Menu
                open={contextMenu !== null}
                onClose={handleCloseContextMenu}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
                }>
                <MenuItem onClick={() => { navigator.clipboard.writeText(getDemandLink()); handleCloseContextMenu() }}>کپی لینک درخواست</MenuItem>
            </Menu>
            <CardHeader
                action={isAdmin &&
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
                        {`ثبت شده در تاریخ ${new Date(demand.created_at).toLocaleDateString("fa-IR")}، در دسته‌ی ${demand.category}`}
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
                    <MenuItem onClick={() => { onBanClicked(); handleMenuClosed() }}>مسدود کردن کاربر</MenuItem>
                    <MenuItem onClick={() => { onDeleteClicked(); handleMenuClosed() }}>حذف درخواست</MenuItem>
                    <NestedMenuItem
                        rightIcon={<ArrowRightIcon />}
                        label='تغییر وضعیت'
                        parentMenuOpen={open}>
                        {statusChangeButtons.map(item =>
                            <MenuItem
                                key={item}
                                onClick={() => { onChangeStatusClicked(item); handleMenuClosed() }}>
                                {translate(item)}
                            </MenuItem>
                        )}
                    </NestedMenuItem>

                </Menu>
                <Typography variant='h6' sx={{ marginTop: 2, display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, minHeight: 110 }}>
                    {demand.body}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container justifyContent="flex-end">
                    <LoadingButton disabled={demand.status !== 'pending'} loading={loading} onClick={onLikeClicked} variant='outlined' endIcon={demand.is_liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}>
                        <Typography fontFamily="arial" fontSize="12" sx={{ paddingLeft: 2, paddingRight: 1 }}>
                            {demand.likes_count}
                        </Typography>
                    </LoadingButton>
                </Grid>
            </CardActions>
        </Card>
    )
}