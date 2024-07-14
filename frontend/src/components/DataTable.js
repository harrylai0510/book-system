'use client';

import {DataGrid, GridToolbar} from "@mui/x-data-grid";

export default function DataTable(props) {
    return (
        <DataGrid
            rows={props.data}
            columns={props.columns}
            initialState={{
                pagination: {
                    paginationModel: {page: 0, pageSize: 10},
                },
                filter: {
                    filterModel: {
                        items: [],
                        quickFilterValues: [],
                    },
                },
            }}
            pageSizeOptions={[10, 20]}
            checkboxSelection
            autoHeight
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            disableRowSelectionOnClick
            disableMultipleRowSelection
            rowSelectionModel={props.rowSelectionModel}
            onRowSelectionModelChange={(newRowSelectionModel) => {
                props.setRowSelectionModel(newRowSelectionModel);
            }}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
                toolbar: {
                    showQuickFilter: true,
                    printOptions: { disableToolbarButton: true },
                    csvOptions: { disableToolbarButton: true },
                },
            }}
        />
    );
}
