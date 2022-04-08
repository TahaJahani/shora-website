import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupIcon from '@mui/icons-material/Group';
import PaidIcon from '@mui/icons-material/Paid';
import LockIcon from '@mui/icons-material/Lock';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BookIcon from '@mui/icons-material/Book';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from 'react-router-dom';
import { Avatar, Divider } from '@mui/material';
import translate from '../Helpers/translate';
import { notificationsAtom } from '../Atoms/notificationsAtom';
import { getRecoil } from 'recoil-nexus';


const RolesAccess = ({ role, onChanged, selectedItem }) => {



    const navigate = useNavigate()

    const onClick = (path) => {
        onChanged(translate(path));
        navigate(path);
    }

    const usersItem = (
        <ListItem button key='کاربران' onClick={() => onClick('users')}
            className="on-hover-grey"
            style={{ backgroundColor: (selectedItem == 'کاربران') ? '#e55c0077' : 'transparent' }}
        >
            <ListItemIcon sx={{ ml: -2 }}>
                <GroupIcon />
            </ListItemIcon>
            <ListItemText primary='کاربران' style={{ textAlign: 'right' }} />
        </ListItem>
    )

    const rentsItem = (
        <ListItem button key='کرایه‌ها' onClick={() => onClick('rents')}
            className="on-hover-grey"
            style={{ backgroundColor: (selectedItem == 'کرایه‌ها') ? '#e55c0077' : 'transparent' }}
        >
            <ListItemIcon sx={{ ml: -2 }}>
                <PaidIcon />
            </ListItemIcon>
            <ListItemText primary='کرایه‌ها' style={{ textAlign: 'right' }} />
        </ListItem>
    )

    const lockersItem = (
        <ListItem button key='کمدها' onClick={() => onClick('lockers')}
            className="on-hover-grey"
            style={{ backgroundColor: (selectedItem == 'کمدها') ? '#e55c0077' : 'transparent' }}
        >
            <ListItemIcon sx={{ ml: -2 }}>
                <LockIcon />
            </ListItemIcon>
            <ListItemText primary='کمدها' style={{ textAlign: 'right' }} />
        </ListItem>
    )

    const paymentsItem = (
        <ListItem button key='پرداخت‌های من' onClick={() => onClick('my-payments')}
            className="on-hover-grey"
            style={{ backgroundColor: (selectedItem == 'پرداخت‌های من') ? '#e55c0077' : 'transparent' }}
        >
            <ListItemIcon sx={{ ml: -2 }}>
                <CreditCardIcon />
            </ListItemIcon>
            <ListItemText primary='پرداخت‌های من' style={{ textAlign: 'right' }} />
        </ListItem>
    )

    const transactionsItem = (
        <ListItem button key='تراکنش‌ها' onClick={() => onClick('transactions')}
            className="on-hover-grey"
            style={{ backgroundColor: (selectedItem == 'تراکنش‌ها') ? '#e55c0077' : 'transparent' }}
        >
            <ListItemIcon sx={{ ml: -2 }}>
                <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary='تراکنش‌ها' style={{ textAlign: 'right' }} />
        </ListItem>
    )

    const lostAndFoundItem = (
        <ListItem button key='اشیای پیدا شده' onClick={() => onClick('lost-and-found')}
            className="on-hover-grey"
            style={{ backgroundColor: (selectedItem == 'اشیای پیدا شده') ? '#e55c0077' : 'transparent' }}
        >
            <ListItemIcon sx={{ ml: -2 }}>
                <TravelExploreIcon />
            </ListItemIcon>
            <ListItemText primary='اشیای پیدا شده' style={{ textAlign: 'right' }} />
        </ListItem>
    )

    const eventsItem = (
        <ListItem button key='رویدادها' onClick={() => onClick('events')}
            className="on-hover-grey"
            style={{ backgroundColor: (selectedItem == 'رویدادها') ? '#e55c0077' : 'transparent' }}
        >
            <ListItemIcon sx={{ ml: -2 }}>
                <EventIcon />
            </ListItemIcon>
            <ListItemText primary='رویدادها' style={{ textAlign: 'right' }} />
        </ListItem>
    )

    const demandsItem = (
        <ListItem button key='درخواست‌ها' onClick={() => onClick('demands')}
            className="on-hover-grey"
            style={{ backgroundColor: (selectedItem == 'درخواست‌ها') ? '#e55c0077' : 'transparent' }}
        >
            <ListItemIcon sx={{ ml: -2 }}>
                <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary='درخواست‌ها' style={{ textAlign: 'right' }} />
        </ListItem>
    )

    const notificationsItem = (
        <ListItem button key='اطلاعیه‌ها' onClick={() => onClick('notifications')}
            className="on-hover-grey"
            style={{ backgroundColor: (selectedItem == 'اطلاعیه‌ها') ? '#e55c0077' : 'transparent' }}
        >
            <ListItemIcon sx={{ ml: -2 }}>
                <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary='اطلاعیه‌ها' style={{ textAlign: 'right' }} />
            {getRecoil(notificationsAtom) != 0 &&
                <Avatar sx={{
                    backgroundColor: '#e55c00', width: 30,
                    height: 30, textAlign: 'center', justifyContent: 'center',
                    alignItems: 'center', flexDirection: 'column'
                }}>
                    {getRecoil(notificationsAtom)}
                </Avatar>
            }
        </ListItem>
    )

    const booksItem = (
        <ListItem button key='کتاب‌ها' onClick={() => onClick('books')}
            className="on-hover-grey"
            style={{ backgroundColor: (selectedItem == 'کتاب‌ها') ? '#e55c0077' : 'transparent' }}
        >
            <ListItemIcon sx={{ ml: -2 }}>
                <BookIcon />
            </ListItemIcon>
            <ListItemText primary='کتاب‌ها' style={{ textAlign: 'right' }} />
        </ListItem>
    )

    const calendarItem = (
        <ListItem button key='تقویم آموزشی' onClick={() => onClick('calendar')}
            className="on-hover-grey"
            style={{ backgroundColor: (selectedItem == 'تقویم آموزشی') ? '#e55c0077' : 'transparent' }}
        >
            <ListItemIcon sx={{ ml: -2 }}>
                <EventNoteIcon />
            </ListItemIcon>
            <ListItemText primary='تقویم آموزشی' style={{ textAlign: 'right' }} />
        </ListItem>
    )

    switch (role) {
        case 'owner':
            return (
                <div>
                    {usersItem}
                    <Divider />
                    {lostAndFoundItem}
                    <Divider />
                    {rentsItem}
                    <Divider />
                    {transactionsItem}
                    <Divider />
                    {paymentsItem}
                    <Divider />
                    {lockersItem}
                    <Divider />
                    {booksItem}
                    <Divider />
                    {eventsItem}
                    <Divider />
                    {demandsItem}
                    <Divider />
                    {notificationsItem}
                    {calendarItem}
                </div>
            )
        case 'admin':
            return (
                <div>
                    {usersItem}
                    <Divider />
                    {lostAndFoundItem}
                    <Divider />
                    {demandsItem}
                    {eventsItem}
                    <Divider />
                    {notificationsItem}
                    {calendarItem}
                    <Divider />
                    {paymentsItemh}
                </div>
            );
        case 'financial':
            return (
                <div>
                    {rentsItem}
                    <Divider />
                    {transactionsItem}
                    <Divider />
                    {lockersItem}
                    <Divider />
                    {booksItem}
                </div>
            );
        case 'user':
            return (
                <div>
                    {lostAndFoundItem}
                    <Divider />
                    {demandsItem}
                    {eventsItem}
                    <Divider />
                    {notificationsItem}
                    {calendarItem}
                    <Divider />
                    {paymentsItem}
                </div>
            )
        case 'welfare':
            return (
                <div>
                    {/* {eventsItem} TODO */}
                </div>
            )
        default:
            return (
                <div>

                </div>
            )
    }
}

export default RolesAccess;