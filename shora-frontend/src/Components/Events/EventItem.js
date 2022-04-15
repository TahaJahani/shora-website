import * as React from 'react';
import { Card, CardHeader, Collapse, Typography, IconButton, CardContent, Box, Chip, Stack } from '@mui/material'
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import RegisterInEventForm from './RegisterInEventForm';
import EventDetailsForm from './EventDetailsForm';
import UsersGrid from "../UsersGrid"
import { hasAccess } from "../../Helpers/UserHelper"
import PayForm from '../../Components/Payments/PayForm'
import { LoadingButton } from '@mui/lab';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentsGrid from '../Payments/PaymentsGrid';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function EventItem({ event, onAddUser, onEnroll, expanded, onExpand, onEdit, loading, onPay }) {

    const editable = hasAccess(['welfare', 'owner'])

    const getTotalAmount = () => {
        return (event.payments.reduce((prev, curr) => parseInt(prev) + parseInt(curr.amount), 0) / 10).toLocaleString("en-US")
    }

    return (
        <Card className={'card-bg'} sx={{ borderRadius: 5, p: 4 }}>
            <CardHeader
                onClick={onExpand}
                title={
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ pl: 4 }}>
                        <Typography variant='h6'>
                            {event.name}
                        </Typography>
                        {event.enrolled &&
                            <Chip
                                color='success'
                                icon={<CheckCircleIcon />}
                                label="ثبت‌نام شده"
                                sx={{ direction: 'ltr' }} />
                        }
                    </Stack>
                }
                action={<ExpandMore expand={expanded} onClick={onExpand}>
                    <ExpandMoreIcon />
                </ExpandMore>}
            />
            <Collapse unmountOnExit in={expanded} sx={{ padding: 2 }}>
                <Card variant={'outlined'} sx={{ borderRadius: 5, background: 'transparent', p: 4, mb: 2 }}>
                    <EventDetailsForm loading={loading} sx={{ marginBottom: 2 }} event={event} isReadOnly={!editable} onSubmit={onEdit} />
                    {!editable &&
                        <Box sx={{ justifyContent: 'flex-end', display: 'flex' }}>
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
                        <Card variant='outlined' sx={{ p: 4, background: 'transparent', borderRadius: 5 }}>
                            <Stack direction={'row'} sx={{ mb: 2 }} justifyContent={"space-between"}>
                                <Typography sx={{ marginBottom: 2 }} variant='h6'>
                                    کاربران ثبت نام شده
                                </Typography>
                                <Typography>
                                    {`${event.users.length} نفر`}
                                </Typography>
                            </Stack>
                            <UsersGrid users={event.users} showColumns={['id', 'name', 'surname', 'student_number']} />
                        </Card>
                    </>
                }
                <Card variant={'outlined'} sx={{ p: 4, background: 'transparent', borderRadius: 5, mb: 2 }}>
                    <PayForm title={'حمایت از رویداد'} subtitle={'شما می‌توانید با حمایت از این رویداد، به بهبود کیفیت برگزاری آن کمک کنید.'} onSubmit={onPay} />
                </Card>
                {editable &&
                    <Card variant='outlined' sx={{ p: 4, background: 'transparent', borderRadius: 5 }}>
                        <Stack direction={'row'} sx={{ mb: 2 }} justifyContent={"space-between"}>
                            <Typography variant='h6'>
                                پرداخت‌های این رویداد
                            </Typography>
                            <Typography>
                                {`مجموعا ${getTotalAmount()} تومان`}
                            </Typography>
                        </Stack>
                        <PaymentsGrid data={event.payments} />
                    </Card>
                }
            </Collapse>
        </Card>
    )
}