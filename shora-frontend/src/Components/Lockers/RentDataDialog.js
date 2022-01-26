import { Dialog, DialogContent, Grid, Typography } from '@mui/material';
import * as React from 'react'
import ColorfulProgressBar from '../ColorfulProgressBar'
import FinishRentForm from '../Rent/FinishRentForm'


const getDaysRemaining = rent => {
    let rented_at = new Date(rent.rented_at);
    let return_deadline = new Date(rent.return_deadline);
    let totalDays = Math.abs(return_deadline - rented_at) / (1000 * 3600 * 24);
    let remainingDays = Math.abs(new Date() - return_deadline) / (1000 * 3600 * 24);
    return Math.min(Math.round((remainingDays / totalDays) * 100), 100);
}
export default function RentDataDialog({ locker, open, onClose, onReturn, loading }) {
    let lockerCode = locker ? locker.letter + locker.number : null
    let daysRemaining = locker && locker.rents && locker.rents[0] ? getDaysRemaining(locker.rents[0]) : 100;
    let holdingUser = locker && locker.rents && locker.rents[0] ?
        locker.rents[0].user.name + ' ' + locker.rents[0].user.surname + ', ' + locker.rents[0].user.student_number : null
    let returnDeadline = holdingUser ? new Date(locker.rents[0].return_deadline).toLocaleDateString("fa-IR") : null

    return (
        <div>
            <Dialog sx={{ direction: 'rtl', padding: 2 }} open={open} onClose={onClose}>
                <DialogContent>
                    <Grid container spacing={1} mb={3}>
                        <Grid item xs={6} component='h5'>
                            کد لاکر
                        </Grid>
                        <Grid item xs={6}>
                            {lockerCode}
                        </Grid>
                        <Grid item xs={6} component='h5'>
                            شخص دارنده
                        </Grid>
                        <Grid item xs={6}>
                            {holdingUser}
                        </Grid>
                        <Grid item xs={6} component='h5'>
                            زمان تحویل
                        </Grid>
                        <Grid item xs={6}>
                            {returnDeadline}
                        </Grid>
                        <Grid item xs={12} component='h5'>
                            زمان باقی‌مانده
                        </Grid>
                        <Grid item xs={12}>
                            <ColorfulProgressBar value={daysRemaining} variant='determinate' />
                        </Grid>
                    </Grid>
                    <FinishRentForm onSubmit={onReturn} loading={loading} selectedRent={locker ? locker.rents[0] : null}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}