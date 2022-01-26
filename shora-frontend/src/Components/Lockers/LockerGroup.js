import { Grid, Dialog, DialogContent } from '@mui/material';
import * as React from 'react'
import LockerItem from "./LockerItem";
import AddRentForm from "../AddRentForm"
import RentDataDialog from './RentDataDialog';
import finishRent from '../../AxiosCalls/Rents/finishRent'
import { useRecoilState } from 'recoil';
import { lockersDetailAtom } from '../../Atoms/lockresDetailAtom'

export default function LockerGroup() {

    const [lockers, setLockers] = useRecoilState(lockersDetailAtom)
    const [selectedLocker, setSelectedLocker] = React.useState();
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [rentDialogData, setRentDialogData] = React.useState({
        open: false,
        loading: false
    })

    const lockerClicked = (locker) => {
        if (locker.rents.length > 0) {
            setSelectedLocker(locker);
            setRentDialogData({ ...rentDialogData, open: true });
        } else {
            setSelectedLocker(locker);
            setDialogOpen(true);
        }
    }

    let onReturn = (data) => {
        setRentDialogData({ ...rentDialogData, loading: true })
        finishRent(data, (res) => {
            setRentDialogData({ ...rentDialogData, open: false, loading: false })
        }, (err) => { console.log(err) })
    }

    return (
        <div>
            <Grid container spacing={2} sx={{ width: { xs: "100%", lg: "50%" }, marginRight: 'auto', marginLeft: 'auto' }}>
                {lockers && lockers.map((locker) => (
                    <Grid item xs={4} md={4} lg={4} key={locker.id}>
                        <LockerItem locker={locker} onClick={() => { lockerClicked(locker) }} />
                    </Grid>
                ))}
            </Grid>
            <Dialog sx={{ direction: 'rtl' }} fullWidth maxWidth='md' open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogContent>
                    <AddRentForm rentable_id={selectedLocker ? selectedLocker.id : null} rentable_type='locker' onSubmit={() => setDialogOpen(false)} />
                </DialogContent>
            </Dialog>
            <RentDataDialog
                locker={selectedLocker}
                onClose={() => setRentDialogData({ ...rentDialogData, open: false })}
                open={rentDialogData.open}
                onReturn={onReturn}
                loading={rentDialogData.loading} />
        </div>
    )
}