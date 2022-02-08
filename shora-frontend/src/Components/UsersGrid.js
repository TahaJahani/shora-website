import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import translate from '../Helpers/translate';
import { isOwner } from '../Helpers/UserHelper';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'نام',
        width: 150,
    },
    {
        field: 'surname',
        headerName: 'نام خانوادگی',
        width: 150,
    },
    {
        field: 'student_number',
        headerName: 'شماره دانشجویی',
        width: 150,
    },
    {
        field: 'roles',
        headerName: 'نقش‌ها',
        sortable: false,
        width: 160,
        valueGetter: (params) => params.row.roles.map((item) => translate(item.role)).join("، ")
    },
];

export default function UsersGrid({ users, showColumns = ['id', 'name', 'surname', 'student_number', 'roles'] }) {

    let gridColumns = columns.filter(column => showColumns.includes(column.field))
    // if (isOwner())
        // add one other column to remove and edit users
    return (
        <div style={{ height: (document.documentElement.clientHeight > 50) ? document.documentElement.clientHeight - 50 : 50, width: '100%' }}>
            <DataGrid
                rows={users}
                columns={gridColumns}
                pageSize={20}
                rowsPerPageOptions={[20]}
                disableSelectionOnClick
            />
        </div>
    );
}
