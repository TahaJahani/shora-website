import * as React from 'react';
import { useRecoilState } from 'recoil';
import { usersAtom } from '../Atoms/usersAtom';
import { eventsAtom } from '../Atoms/eventsAtom';
import EventItem from '../Components/Events/EventItem';
import getAllStudentNumbers from "../AxiosCalls/User/getAllStudentNumbers"
import getAllEvents from '../AxiosCalls/Events/getAllEvents';
import { Card, Divider, Grid, Typography } from '@mui/material';
import EventDetailsForm from "../Components/Events/EventDetailsForm"
import addEvent from '../AxiosCalls/Events/addEvent';
import editEvent from '../AxiosCalls/Events/editEvent';
import createPayment from '../AxiosCalls/Payments/createPayment';
import enrollInEvent from '../AxiosCalls/Events/enrollInEvent'
import { hasAccess } from '../Helpers/UserHelper';

export default function EventsPage({ setSelectedItem }) {

    const [users, setUsers] = useRecoilState(usersAtom)
    const [events, setEvents] = useRecoilState(eventsAtom)
    const [loading, setLoading] = React.useState(false)
    const [itemLoading, setItemLoading] = React.useState(false)
    const [expandedItem, setExpandedItem] = React.useState(-1);

    const editable = hasAccess(["owner", "welfare"]);

    React.useEffect(() => {
        setSelectedItem("رویدادها")
        if (!users)
            getAllStudentNumbers((res) => setUsers(res.data.users), () => { })
        if (!events)
            getAllEvents((res) => setEvents(res.data.events), () => { });
    }, [])

    const onSubmitNewForm = (data) => {
        setLoading(true)
        addEvent(data, (res) => {
            setLoading(false)
            setEvents([...events, res.data.event])
        }, (res) => { console.log(res) })
    }

    const onClickItems = (itemId) => {
        setExpandedItem(expandedItem === itemId ? -1 : itemId);
        document.body.style.overflow = 'auto';
    }

    const onEditItems = (data) => {
        setItemLoading(true)
        editEvent(data, () => {
            setItemLoading(false)
            getAllEvents((res) => setEvents(res.data.events), () => { });
        }, (res) => { console.log(res) })
    }

    const addUserToEvent = (user, event_id) => {
        setEvents(events.map(event => event.id === event_id ? { ...event, users: [...event.users, user] } : event))
    }

    const enroll = (event_id) => {
        setItemLoading(true)
        enrollInEvent(
            event_id,
            (res) => {
                setEvents(
                    events.map(item => {
                        if (item.id === event_id)
                            return { ...item, enrolled: true }
                        return item
                    }))
                setItemLoading(false)
            },
            (err) => {
                console.log(err)
                setItemLoading(false)
            })
    }

    const payForEvent = (event_id, amount) => {
        createPayment({
            amount: amount,
            origin: "رویداد",
            origin_id: event_id,
        }, (res) => {
            window.location.href = res.data.payment.link;
        }, (err) => {
            console.log(err)
        })
    }

    return (
        <div>
            {editable &&
                <>
                    <Card variant='outlined' sx={{ p: 4, mb: 2, borderRadius: 5 }} className={'card-bg'}>
                        <Typography variant='h5' mb={2}>
                            افزودن رویداد جدید
                        </Typography>
                        <EventDetailsForm isReadOnly={false} onSubmit={onSubmitNewForm} loading={loading} />
                    </Card>
                    <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                </>
            }
            {events && events.map(event =>
                <Grid item mb={2} xs={12} key={event.id}>
                    <EventItem
                        onEdit={(data) => onEditItems({ ...data, event_id: event.id })}
                        loading={itemLoading}
                        event={event}
                        expanded={expandedItem === event.id}
                        onExpand={() => onClickItems(event.id)}
                        onAddUser={(user) => addUserToEvent(user, event.id)}
                        onPay={(amount) => payForEvent(event.id, amount)}
                        onEnroll={() => enroll(event.id)}
                    />
                </Grid>
            )}
        </div>
    )
}