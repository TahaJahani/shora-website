import * as React from 'react';
import { useRecoilState } from 'recoil'
import { userAtom } from '../Atoms/userAtom'
import { hasAccess } from "../Helpers/UserHelper"
import AddLostAndFoundForm from "../Components/LostAndFound/AddLostAndFoundForm"
import getLostAndFound from "../AxiosCalls/LostAndFound/getLostAndFound"
import LostAndFoundGrid from '../Components/LostAndFound/LostAndFoundGrid';
import { lostAndFoundAtom } from "../Atoms/lostAndFoundAtom"
import { getRecoil, setRecoil } from 'recoil-nexus';
import { Alert, Backdrop, CircularProgress, Dialog, Fab, Grid, Pagination, Snackbar, Paper, IconButton, InputBase, Divider, Menu, MenuItem, AlertTitle, Collapse, Autocomplete, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export default function ({setSelectedItem}) {
    const [found, setFound] = useRecoilState(lostAndFoundAtom);

    React.useEffect(() => {
        setSelectedItem('اشیای پیدا شده');
        if (!found) {
            getLostAndFound((res) => {
                setFound(res.data.lost_and_found.map(item => {
                    return {
                        ...item,
                        found_at: (new Date(item.found_at)).toLocaleDateString('fa-IR'),
                    };   
                }));
            }, () => { })
        }
    }, [])

    const onAdd = (newItem) => {
        setFound([...found, newItem])
    }
    const onRowDeleted = (deleted_id) => {
        const found = getRecoil(lostAndFoundAtom)
        setRecoil(lostAndFoundAtom, found.filter(item => item.id !== deleted_id))
    }

    const [dialogOpen, setDialogOpen] = React.useState(false);

    return (
        <div>
            <LostAndFoundGrid found={found} onRowDeleted={onRowDeleted}
            />
            <Dialog
                style={{borderRadius: 20}}
                dir='rtl'
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                fullWidth={true}
                maxWidth='md'>
                    <AddLostAndFoundForm onAdd={(newItem) => {
                        onAdd(newItem);
                        setDialogOpen(false);
                    }} 
                    onCancel={() => { setDialogOpen(false); }}
                    />
            </Dialog>
            
            {hasAccess(['owner', 'admin', 'financial']) && <><Fab
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
                ثبت شی جدید
            </Fab></>}
        </div>
    )
}