import * as React from 'react';
import { Container, Paper } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {
        field: 'id',
        headerName: 'شناسه',
        width: 50,
    },
    {
        field: 'amount',
        headerName: 'مبلغ (ریال)',
        width: 130,
        type: 'number',
    },
    {
        field: 'description',
        headerName: 'توضیحات',
        width: 130,
        flex: 1,
    },
    {
        field: 'paid_at',
        headerName: 'تاریخ',
        width: 100,
        type: 'date',
    },
];

function PaymentsPage({setSelectedItem}) {

    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        //todo: get payments...
        setSelectedItem("پرداخت‌های من")
    }, [])
    return (
        <Container>
            <Paper sx={{p: 4}}>
                <DataGrid
                    columns={columns} 
                    rows={rows}
                    autoHeight
                />
            </Paper>
        </Container>
    )
}

export default PaymentsPage;