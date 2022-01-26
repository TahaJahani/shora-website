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

export default function EventsPage() {

    const [users, setUsers] = useRecoilState(usersAtom)
    const [events, setEvents] = useRecoilState(eventsAtom)
    const [loading, setLoading] = React.useState(false)
    const [itemLoading, setItemLoading] = React.useState(false)
    const [expandedItem, setExpandedItem] = React.useState(-1);

    React.useEffect(() => {
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
    }

    const onEditItems = (data) => {
        setItemLoading(true)
        editEvent(data, () => {
            setItemLoading(false)
            getAllEvents((res) => setEvents(res.data.events), () => { });
        }, (res) => { console.log(res) })
    }

    const addUserToEvent = (user, event_id) => {
        setEvents(events.map(event => event.id === event_id ? {...event, users: [...event.users, user]} : event))
    }

    return (
        <div>
            <Card variant='outlined' sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant='h5' mb={2}>
                    افزودن رویداد جدید
                </Typography>
                <EventDetailsForm isReadOnly={false} onSubmit={onSubmitNewForm} loading={loading} />
            </Card>
            <Divider sx={{marginTop: 2, marginBottom: 2}}/>
            {events && events.map(event =>
                <Grid item mb={2} xs={12} key={event.id}>
                    <EventItem
                        onEdit={(data) => onEditItems({ ...data, event_id: event.id })}
                        loading={itemLoading}
                        event={event}
                        expanded={expandedItem === event.id}
                        onExpand={() => onClickItems(event.id)}
                        onAddUser={(user) => addUserToEvent(user, event.id)} />
                </Grid>
            )}
        </div>
    )
}