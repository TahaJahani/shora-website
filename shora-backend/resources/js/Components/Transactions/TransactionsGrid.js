import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, Typography, IconButton } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import translate from "../../Helpers/translate"

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'type',
        headerName: 'نوع تراکنش',
        width: 150,
        valueGetter: (params) => translate(params.row.type)
    },
    {
        field: 'amount',
        headerName: 'مبلغ تراکنش',
        width: 150,
    },
    {
        field: 'at',
        headerName: 'تاریخ تراکنش',
        width: 150,
        valueGetter: (params) => new Date(params.row.at).toLocaleDateString("fa-IR")
    },
    {
        field: 'description',
        headerName: 'توضیحات تراکنش',
        minWidth: 250,
        flex: 1
    },
];

export default function TransactionsGrid({ transactions }) {

    // const [dialogData, setDialogData] = React.useState({
    //     isOpen: false,
    //     selectedRent: null,
    // })

    // let onSubmit = (data) => {
    //     finishRent(data, (res) => {setDialogData({...dialogData, isOpen: false})}, (err) => {console.log(err)})
    // }

    // const actionsColumn = {
    //     field: 'actions',
    //     headerName: 'عملیات',
    //     with: 150,
    //     renderCell: (params) => (
    //         <div>
    //             <IconButton color="success" onClick={() => {
    //                 setDialogData({
    //                     isOpen: true,
    //                     selectedRent: params.row,
    //                 })
    //             }}>
    //                 <DoneIcon />
    //             </IconButton>
    //         </div>
    //     ),
    // }

    // if (isFinancial())
    //     columns.push(actionsColumn);

    return (
        <Card variant="" sx={{ padding: 2, margin: 2, height: '100%' }} style={{borderRadius: 20}} className={"demand-card-bg"}>
            <DataGrid
                rows={transactions ? transactions : []}
                autoHeight={true}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
            />
            {/* <FinishRentDialog {...dialogData} onSubmit={onSubmit} onClose={() => setDialogData({...dialogData, isOpen: false})} /> */}
        </Card>
    );
}
