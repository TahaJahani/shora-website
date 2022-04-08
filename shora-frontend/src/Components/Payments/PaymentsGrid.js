import * as React from 'react';
import { Container, Paper, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {
        field: 'id',
        headerName: 'شناسه',
        width: 100,
        align: 'right',
        headerAlign: 'left',
    },
    {
        field: 'user',
        headerName: 'کاربر',
        width: 150,
        valueGetter: (params) => `${params.row.name} ${params.row.surname}`,
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
];

function PaymentsGrid({ data }) {
    return (
        <>
            {
                data.length === 0 ?
                    <Typography sx={{ width: '100%', textAlign: 'center' }}>
                        {"هیچ پرداختی وجود ندارد"}
                    </Typography>
                    : <DataGrid
                        disableColumnMenu
                        hideFooter
                        columns={columns}
                        rows={data}
                        autoHeight
                    />
            }
        </>
    )
}

export default PaymentsGrid;