import * as React from 'react';
import AddRentForm from '../Components/AddRentForm';
import RentsGrid from '../Components/RentsGrid';
import { rentsAtom } from '../Atoms/rentsAtom';
import {useRecoilState} from "recoil"
import { Alert, Backdrop, CircularProgress, Dialog, Fab, Grid, Pagination, Snackbar, Paper, IconButton, InputBase, Divider, Menu, MenuItem, AlertTitle, Collapse, Autocomplete, TextField } from '@mui/material'
import getRents from "../AxiosCalls/Rents/getRents"
import AddIcon from '@mui/icons-material/Add'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default function({setSelectedItem}) {

    const [rents, setRents] = useRecoilState(rentsAtom)

    React.useEffect(() => {
        setSelectedItem('کرایه‌ها');
        if (!rents)
            getRents((res) => setRents(res.data.rents))
    }, []);

    const [dialogOpen, setDialogOpen] = React.useState(false);

    return(
        <div style={{height: '100%'}}>
            <ReactCSSTransitionGroup
            transitionAppear={true}
            transitionAppearTimeout={600}
            transitionEnterTimeout={600}
            transitionLeaveTimeout={200}
            transitionName={'SlideIn'}
            >
                <RentsGrid rents={rents} />
            </ReactCSSTransitionGroup>
            <Dialog
                style={{borderRadius: 20}}
                dir='rtl'
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                fullWidth={true}
                maxWidth='md'>
                    <AddRentForm onCancel={() => setDialogOpen(false)} />
            </Dialog>
            
            <Fab
                sx={{
                    margin: 1,
                    position: "fixed",
                    bottom: 8,
                    left: 8
                }}
                onClick={() => setDialogOpen(true)}
                variant='extended'
                color='primary'>
                <AddIcon sx={{ ml: 0.5 }} />
                ثبت کرایه جدید
            </Fab>
        </div>
    )
}