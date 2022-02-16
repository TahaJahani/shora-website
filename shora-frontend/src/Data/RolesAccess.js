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
        <ListItem button key='اعضای شورا' onClick={() => onClick('users')}
        className="on-hover-grey"
        style={{backgroundColor: (selectedItem == 'اعضای شورا') ? '#e53d0077' : 'transparent'}}
        >
            <ListItemIcon sx={{ml: -2}}>
                <GroupIcon />
            </ListItemIcon>
            <ListItemText primary='اعضای شورا' style={{textAlign: 'right'}} />
        </ListItem>
    )

    const rentsItem = (
        <ListItem button key='کرایه‌ها' onClick={() => onClick('rents')}
        className="on-hover-grey"
        style={{backgroundColor: (selectedItem == 'کرایه‌ها') ? '#e53d0077' : 'transparent'}}
        >
            <ListItemIcon sx={{ml: -2}}>
                <PaidIcon />
            </ListItemIcon>
            <ListItemText primary='کرایه‌ها' style={{textAlign: 'right'}} />
        </ListItem>
    )

    const lockersItem = (
        <ListItem button key='کمدها' onClick={() => onClick('lockers')}
        className="on-hover-grey"
        style={{backgroundColor: (selectedItem == 'کمدها') ? '#e53d0077' : 'transparent'}}
        >
            <ListItemIcon sx={{ml: -2}}>
                <LockIcon />
            </ListItemIcon>
            <ListItemText primary='کمدها' style={{textAlign: 'right'}} />
        </ListItem>
    )

    const transactionsItem = (
        <ListItem button key='تراکنش‌ها' onClick={() => onClick('transactions')}
        className="on-hover-grey"
        style={{backgroundColor: (selectedItem == 'تراکنش‌ها') ? '#e53d0077' : 'transparent'}}
        >
            <ListItemIcon sx={{ml: -2}}>
                <CreditCardIcon />
            </ListItemIcon>
            <ListItemText primary='تراکنش‌ها' style={{textAlign: 'right'}} />
        </ListItem>
    )

    const lostAndFoundItem = (
        <ListItem button key='اشیای پیدا شده' onClick={() => onClick('lost-and-found')}
        className="on-hover-grey"
        style={{backgroundColor: (selectedItem == 'اشیای پیدا شده') ? '#e53d0077' : 'transparent'}}
        >
            <ListItemIcon sx={{ml: -2}}>
                <TravelExploreIcon />
            </ListItemIcon>
            <ListItemText primary='اشیای پیدا شده' style={{textAlign: 'right'}} />
        </ListItem>
    )

    const eventsItem = (
        <ListItem button key='رویدادها' onClick={() => onClick('events')}
        className="on-hover-grey"
        style={{backgroundColor: (selectedItem == 'رویدادها') ? '#e53d0077' : 'transparent'}}
        >
            <ListItemIcon sx={{ml: -2}}>
                <EventIcon />
            </ListItemIcon>
            <ListItemText primary='رویدادها' style={{textAlign: 'right'}} />
        </ListItem>
    )

    const demandsItem = (
        <ListItem button key='درخواست‌ها' onClick={() => onClick('demands')}
        className="on-hover-grey"
        style={{backgroundColor: (selectedItem == 'درخواست‌ها') ? '#e53d0077' : 'transparent'}}
        >
            <ListItemIcon sx={{ml: -2}}>
                <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary='درخواست‌ها' style={{textAlign: 'right'}} />
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
                    {lockersItem}
                    <Divider />
                    {/* {eventsItem} TODO */}
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
                    <Divider />
                    {transactionsItem}
                    <Divider />
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
                    {/* {eventsItem} TODO */}
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