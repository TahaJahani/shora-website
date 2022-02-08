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
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';
import translate from '../Helpers/translate';


const RolesAccess = ({ role, onChanged, selectedItem }) => {

    

    const navigate = useNavigate()

    const onClick = (path) => {
        onChanged(translate(path));
        navigate(path);
    }

    const usersItem = (
        <ListItem button key='کاربران' onClick={() => onClick('users')}
        style={{backgroundColor: (selectedItem == 'کاربران') ? '#e53d0077' : 'transparent'}}
        >
            <ListItemIcon>
                <GroupIcon />
            </ListItemIcon>
            <ListItemText primary='کاربران' />
        </ListItem>
    )

    const rentsItem = (
        <ListItem button key='کرایه‌ها' onClick={() => onClick('rents')}
        style={{backgroundColor: (selectedItem == 'کرایه‌ها') ? '#e53d0077' : 'transparent'}}
        >
            <ListItemIcon>
                <PaidIcon />
            </ListItemIcon>
            <ListItemText primary='کرایه‌ها' />
        </ListItem>
    )

    const lockersItem = (
        <ListItem button key='لاکرها' onClick={() => onClick('lockers')}
        style={{backgroundColor: (selectedItem == 'لاکرها') ? '#e53d0077' : 'transparent'}}
        >
            <ListItemIcon>
                <LockIcon />
            </ListItemIcon>
            <ListItemText primary='لاکرها' />
        </ListItem>
    )

    const transactionsItem = (
        <ListItem button key='تراکنش‌ها' onClick={() => onClick('transactions')}
        style={{backgroundColor: (selectedItem == 'تراکنش‌ها') ? '#e53d0077' : 'transparent'}}
        >
            <ListItemIcon>
                <CreditCardIcon />
            </ListItemIcon>
            <ListItemText primary='تراکنش‌ها' />
        </ListItem>
    )

    const lostAndFoundItem = (
        <ListItem button key='اشیاء پیدا شده' onClick={() => onClick('lost-and-found')}
        style={{backgroundColor: (selectedItem == 'اشیاء پیدا شده') ? '#e53d0077' : 'transparent'}}
        >
            <ListItemIcon>
                <TravelExploreIcon />
            </ListItemIcon>
            <ListItemText primary='اشیاء پیدا شده' />
        </ListItem>
    )

    const eventsItem = (
        <ListItem button key='رویدادها' onClick={() => onClick('events')}
        style={{backgroundColor: (selectedItem == 'رویدادها') ? '#e53d0077' : 'transparent'}}
        >
            <ListItemIcon>
                <EventIcon />
            </ListItemIcon>
            <ListItemText primary='رویدادها' />
        </ListItem>
    )

    const demandsItem = (
        <ListItem button key='درخواست‌ها' onClick={() => onClick('demands')}
        style={{backgroundColor: (selectedItem == 'درخواست‌ها') ? '#e53d0077' : 'transparent'}}
        >
            <ListItemIcon>
                <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary='درخواست‌ها' />
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
                    {transactionsItem}
                    {lockersItem}
                    <Divider />
                    {eventsItem}
                    <Divider />
                    {demandsItem}
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
                </div>
            );
        case 'financial':
            return (
                <div>
                    {rentsItem}
                    {transactionsItem}
                    {lockersItem}
                </div>
            );
        case 'user':
            return (
                <div>
                    {lostAndFoundItem}
                    <Divider />
                    {demandsItem}
                </div>
            )
        case 'welfare':
            return (
                <div>
                    {eventsItem}
                </div>
            )
        default:
            return(
                <div>
                    
                </div>
            )
    }
}

export default RolesAccess;