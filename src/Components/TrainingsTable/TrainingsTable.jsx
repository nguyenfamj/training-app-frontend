import { useState } from 'react';

import { useTrainingsQuery } from '../../Services/trainingsAPI';
import { DataGrid } from '@mui/x-data-grid';

// CSS
import './TrainingsTable.css';

// Import from MUI
import { CircularProgress } from '@mui/material';

// Date formatting
import { format } from 'date-fns';

const TrainingsTable = () => {
  const { data, isSuccess } = useTrainingsQuery();
  console.log(data);

  const [pageSize, setPageSize] = useState(7);

  const columns = [
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
      renderCell: (cell) => {
        return <>{format(new Date(cell.value), 'dd/MM/yyyy')}</>;
      },
      editable: false,
      headerClassName: 'grid-header',
    },
    {
      field: 'activity',
      headerName: 'Activity',
      width: 200,
      editable: true,
      headerClassName: 'grid-header',
    },
    {
      field: 'duration',
      headerName: 'Duration',
      type: 'number',
      width: 200,
      editable: true,
      headerClassName: 'grid-header',
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

export default TrainingsTable;
