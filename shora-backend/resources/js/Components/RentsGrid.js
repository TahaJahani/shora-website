import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { hasAccess, isFinancial } from '../Helpers/UserHelper';
import { Card, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FinishRentDialog from "./FinishRentDialog"
import finishRent from "../AxiosCalls/Rents/finishRent"

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'fullname',
        headerName: 'نام و نام خانوادگی',
        width: 150,
        valueGetter: (params) => `${params.row.user.name} ${params.row.user.surname}`
    },
    {
        field: 'student_number',
        headerName: 'شماره دانشجویی',
        width: 150,
        valueGetter: (params) => params.row.user.student_numbre
    },
    {
        field: 'amount_paid',
        headerName: 'مقدار ودیعه',
        width: 150,
    },
    {
        field: 'locker_code',
        headerName: 'شماره کمد',
        width: 150,
        valueGetter: (params) => `${params.row.rentable.letter} ${params.row.rentable.number}`
    },
    {
        field: 'phone_number',
        headerName: 'شماره تماس',
        width: 150,
        valueGetter: (params) => params.row.user.phone_number
    },
    {
        field: 'rented_at',
        headerName: 'زمان شروع کرایه',
        width: 150,
        valueGetter: (params) => new Date(params.row.rented_at).toLocaleDateString("fa-IR")
    },
];

export default function RentsGrid({ rents }) {

    const [dialogData, setDialogData] = React.useState({
        isOpen: false,
        selectedRent: null,
        loading: false
    })

    let onSubmit = (data) => {
        setDialogData({...dialogData, loading: true})
        finishRent(data, (res) => {
            setDialogData({...dialogData, isOpen: false, loading: false})
        }, (err) => {console.log(err)})
    }

    const actionsColumn = {
        field: 'actions',
        headerName: 'عملیات',
        with: 150,
        renderCell: (params) => (
            <div>
                <IconButton color="error" onClick={() => {
                    setDialogData({
                        loading: false,
                        isOpen: true,
                        selectedRent: params.row,
                    })
                }}>
                    <DeleteIcon />
                </IconButton>
            </div>
        ),
    }

    if (hasAccess(['financial', 'owner']))
        columns.push(actionsColumn);

    return (
        <Card variant="" sx={{ padding: 2, margin: 2, height: '100%' }} style={{borderRadius: 20}} className={"demand-card-bg"}>
            <DataGrid
                rows={rents ? rents : []}
                autoHeight={true}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[20]}
            />
            <FinishRentDialog {...dialogData} onSubmit={onSubmit} onClose={() => setDialogData({...dialogData, isOpen: false})} />
        </Card>
    );
}
