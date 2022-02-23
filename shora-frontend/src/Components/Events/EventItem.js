import * as React from 'react';
import { Card, CardHeader, Collapse, Typography, IconButton, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import RegisterInEventForm from './RegisterInEventForm';
import EventDetailsForm from './EventDetailsForm';
import UsersGrid from "../UsersGrid"
import { hasAccess } from "../../Helpers/UserHelper"
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function EventItem({ event, onAddUser, expanded, onExpand, onEdit, loading }) {

    return (
        <Card>
            <CardHeader
                onClick={onExpand}
                title={<Typography variant='h6'>
                    {event.name}
                </Typography>}
                action={<ExpandMore expand={expanded} onClick={onExpand}>
                    <ExpandMoreIcon />
                </ExpandMore>}
            />
            <Collapse unmountOnExit in={expanded} sx={{ padding: 2 }}>
                <EventDetailsForm loading={loading} sx={{ marginBottom: 2 }} event={event} isReadOnly={!hasAccess(['welfare', 'owner'])} onSubmit={onEdit}/>
                <RegisterInEventForm event={event} sx={{ marginBottom: 2 }} onSuccess={(user) => onAddUser(user)} />
                <Card variant='outlined' sx={{ padding: 2 }}>
                    <Typography sx={{ marginBottom: 2 }} variant='h6'>
                        اعضای شورا ثبت‌نام شده
                    </Typography>
                    <UsersGrid users={event.users} showColumns={['id', 'name', 'surname', 'student_number']} />
                </Card>
            </Collapse>
        </Card>
    )
}