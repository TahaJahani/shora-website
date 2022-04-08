import * as React from 'react';
import { Container, Paper, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import getMyPayments from '../AxiosCalls/Payments/getMyPayments'

const columns = [
    {
        field: 'id',
        headerName: 'شناسه',
        width: 100,
        align: 'right',
        headerAlign: 'left',
    },
    {
        field: 'amount',
        headerName: 'مبلغ (ریال)',
        width: 130,
        type: 'number',
        align: 'right',
        headerAlign: 'left',
    },
    {
        field: 'description',
        headerName: 'توضیحات',
        width: 130,
        flex: 1,
        align: 'right',
        headerAlign: 'left',
    },
    {
        field: 'paid_at',
        headerName: 'تاریخ',
        width: 150,
        type: 'date',
        valueGetter: (params) => new Date(params.row.paid_at).toLocaleDateString("fa-IR"),
        align: 'right',
        headerAlign: 'left',
    },
];

function PaymentsPage({ setSelectedItem }) {

    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        setSelectedItem("پرداخت‌های من")
        getMyPayments((res) => {
            setRows(res.data.payments)
        }, (err) => {
            console.log(err)
        })
    }, [])
    return (
        <Container>
            <Paper sx={{ p: 4, borderRadius: 5 }} className={"card-bg"}>
                <Typography sx={{mb: 2}} variant={'h5'}>
                    {"همه‌ی پرداخت‌ها"}
                </Typography>
                {rows.length === 0 ? 
                    <Typography sx={{width: '100%', textAlign: 'center'}}>
                        {"شما هیچ پرداختی ندارید!"}
                    </Typography>
                : <DataGrid
                        disableColumnMenu
                        hideFooter
                        columns={columns}
                        rows={rows}
                        autoHeight
                    />
                }
            </Paper>
        </Container>
    )
}

export default PaymentsPage;