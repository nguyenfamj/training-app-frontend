import { useState } from 'react';

import { useCustomersQuery } from '../../Services/customersAPI';
import { DataGrid } from '@mui/x-data-grid';

// CSS
import './CustomerTable.css';

// Import from MUI
import { CircularProgress } from '@mui/material';

const CustomersTable = () => {
  const { data, isSuccess } = useCustomersQuery();

  const [pageSize, setPageSize] = useState(7);

  const columns = [
    {
      field: 'firstname',
      headerName: 'Firstname',
      width: 150,
      editable: true,
    },
    {
      field: 'lastname',
      headerName: 'Lastname',
      width: 150,
      editable: true,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 150,
      editable: true,
    },
    {
      field: 'postcode',
      headerName: 'Postcode',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      editable: true,
    },
    {
      field: 'streetaddress',
      headerName: 'Street address',
      width: 200,
      editable: true,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 150,
      editable: true,
    },
  ];

  return (
    <div className='grid-layout'>
      <div className='grid-wrapper'>
        {isSuccess ? (
          <DataGrid
            columns={columns}
            rows={data?.content}
            getRowId={(row) => (row.internalId = row.links[1].href)}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[7, 15]}
            sx={{
              boxShadow: 3,
              border: 2,
              '& .MuiDataGrid-cell:hover': {
                color: 'darkorchid',
              },
            }}
            editMode='row'
          />
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
};

export default CustomersTable;
