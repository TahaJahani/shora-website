import * as React from 'react';
import { Card, CardHeader, Collapse, Typography, IconButton, CardContent, Box } from '@mui/material'
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import RegisterInEventForm from './RegisterInEventForm';
import EventDetailsForm from './EventDetailsForm';
import UsersGrid from "../UsersGrid"
import { hasAccess } from "../../Helpers/UserHelper"
import PayForm from '../../Components/Payments/PayForm'
import { LoadingButton } from '@mui/lab';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function EventItem({ event, onAddUser, onEnroll, expanded, onExpand, onEdit, loading, payClicked }) {

    // const editable = hasAccess(['welfare', 'owner'])
    const editable = false;

    return (
        <Card className={'card-bg'} sx={{ borderRadius: 5, p: 4 }}>
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
                <Card variant={'outlined'} sx={{ borderRadius: 5, background: 'transparent', p: 4, mb: 2 }}>
                    <EventDetailsForm loading={loading} sx={{ marginBottom: 2 }} event={event} isReadOnly={!editable} onSubmit={onEdit} />
                    {!editable &&
                        <Box sx={{justifyContent: 'flex-end', display: 'flex'}}>
                            <LoadingButton
                                loading={loading}
                                variant={'contained'}
                                onClick={onEnroll}
                                disabled={event.enrolled}
                            >
                                {"ثبت نام در رویداد"}
                            </LoadingButton>
                        </Box>
                    }
                </Card>
                {editable &&
                    <>
                        <RegisterInEventForm event={event} sx={{ marginBottom: 2 }} onSuccess={(user) => onAddUser(user)} />
                        <Card variant='outlined' sx={{ padding: 2, background: 'transparent', mb: 2 }}>
                            <Typography sx={{ marginBottom: 2 }} variant='h6'>
                                کاربران ثبت نام شده
                            </Typography>
                            <UsersGrid users={event.users} showColumns={['id', 'name', 'surname', 'student_number']} />
                        </Card>
                    </>
                }
                <Card variant={'outlined'} sx={{ p: 4, background: 'transparent', borderRadius: 5 }}>
                    <PayForm title={'حمایت از رویداد'} subtitle={'شما می‌توانید با حمایت از این رویداد، به بهبود کیفیت برگزاری آن کمک کنید.'} onSubmit={payClicked} />
                </Card>
            </Collapse>
        </Card>
    )
}