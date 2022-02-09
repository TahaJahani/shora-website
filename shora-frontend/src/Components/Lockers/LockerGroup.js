import { Grid, Dialog, DialogContent, TextField, IconButton } from '@mui/material';
import * as React from 'react'
import LockerItem from "./LockerItem";
import AddRentForm from "../AddRentForm"
import RentDataDialog from './RentDataDialog';
import finishRent from '../../AxiosCalls/Rents/finishRent'
import { useRecoilState } from 'recoil';
import { lockersDetailAtom } from '../../Atoms/lockresDetailAtom'

export default function LockerGroup() {

    const [lockers, setLockers] = useRecoilState(lockersDetailAtom)
    const [searchPredicate, setSearchPredicate] = React.useState('')
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

    const getCurrentLockers = () => {
        return lockers.filter((locker) => {
            return (searchPredicate == '') || ((locker.letter.toString() + locker.number.toString()).includes(searchPredicate))
        });
    }

    return (
        <div>
            <span dir="ltr">
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="جست‌وجو"
                    value={searchPredicate}
                    onChange={(e) => setSearchPredicate(e.target.value)}
                    style={{ marginBottom: 16, width: '98.5%', backgroundColor: 'white' }}
                    InputProps={{
                        inputProps: {
                            style: { textAlign: 'center', fontSize: 20 }
                        }
                    }}
                />
              </span>

            <Grid container spacing={2} sx={{ width: { xs: "100%", lg: "100%" }, marginRight: 'auto', marginLeft: 'auto' }}>
                {lockers && getCurrentLockers().map((locker) => (
                    <Grid item xs={2} md={2} lg={2} key={locker.id}>
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