import { useState } from 'react';

import { useCustomersQuery, useCustomerDelete } from '../../Services/customersAPI';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CustomerForm from '../CustomerForm/CustomerForm';
import TrainingForm from '../TrainingForm/TrainingForm';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

// CSS
import './CustomerTable.css';

// Import from MUI
import { CircularProgress, Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Import date formatting
import { format } from 'date-fns';

const CustomersTable = () => {
  const { data, isSuccess } = useCustomersQuery();
  console.log(data);
  const [pageSize, setPageSize] = useState(7);

  const deleteCustomer = useCustomerDelete();

  // Handle Form State
  const [formStates, setFormStates] = useState({
    type: '',
    open: false,
    initialData: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      streetaddress: '',
      postcode: '',
      city: '',
    },
  });

  const [trainingForm, setTrainingForm] = useState({
    type: '',
    open: false,
    initialData: {
      date: new Date(),
      activity: '',
      duration: 0,
      customer: '',
    },
  });

  // Handle Confirm Dialog State
  const [confirmDialog, setConfirmDialog] = useState({
    title: '',
    confirmMessage: '',
    open: false,
    onConfirm: () => {},
  });

  // Click event ("Edit" button)
  const handleEditCustomerButton = (row) => {
    setFormStates({
      type: 'edit',
      open: true,
      initialData: {
        firstname: row.firstname,
        lastname: row.lastname,
        email: row.email,
        phone: row.phone,
        streetaddress: row.streetaddress,
        postcode: row.postcode,
        city: row.city,
      },
      customerUrl: row.links[1].href,
    });
  };

  // Click event ("Add" button)
  const handleAddCustomerButton = () => {
    setFormStates({
      ...formStates,
      type: 'add',
      open: true,
    });
  };

  // Click event ("Add training" button)
  const handleAddTrainingButton = (customerUrl) => [
    setTrainingForm({
      type: 'add',
      open: true,
      initialData: {
        date: format(new Date(), 'yyyy-MM-dd'),
        activity: '',
        duration: '',
        customer: customerUrl,
      },
    }),
  ];

  // Handle close form
  const handleCloseForm = () => {
    setFormStates({
      type: '',
      open: false,
      initialData: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: '',
      },
    });
  };

  // Handle close training form
  const handleCloseTraining = () => {
    setTrainingForm({
      type: '',
      open: false,
      initialData: {
        date: '',
        activity: '',
        duration: 0,
        customer: '',
      },
    });
  };

  // Handle close confirm dialog
  const handleCloseConfirm = () => {
    setConfirmDialog({
      title: '',
      confirmMessage: '',
      open: false,
      onConfirm: () => {},
    });
  };

  // In-line editing
  // const [editRowsModel, setEditRowsModel] = useState({});

  // Handle editing customer
  // const handleEditRowsModelChange = (model) => {
  //   setEditRowsModel(model);
  // };
  //
  // const handleRowEditCommit = (param) => {
  //   const data = {
  //     firstname: editRowsModel[param].firstname.value,
  //     lastname: editRowsModel[param].lastname.value,
  //     email: editRowsModel[param].email.value,
  //     phone: editRowsModel[param].phone.value,
  //     streetaddress: editRowsModel[param].streetaddress.value,
  //     postcode: editRowsModel[param].postcode.value,
  //     city: editRowsModel[param].city.value,
  //   };
  //   editMutation.mutate({ customerUrl: param, data });
  // };
  // Handle editing customer
  // const handleEditRowsModelChange = (model) => {
  //   setEditRowsModel(model);
  // };

  const columns = [
    {
      field: 'training_add',
      headerName: '',
      renderCell: ({ id }) => {
        return (
          <Button
            key={id}
            variant='outlined'
            onClick={() => {
              handleAddTrainingButton(id);
            }}
          >
            Add training
          </Button>
        );
      },
      width: 150,
    },
    {
      field: 'edit',
      headerName: '',
      renderCell: ({ id, row }) => {
        return (
          <Button
            key={id}
            variant='text'
            onClick={() => {
              handleEditCustomerButton(row);
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      field: 'delete',
      headerName: '',
      renderCell: ({ id }) => {
        return (
          <Button
            key={id}
            variant='contained'
            sx={{ bgcolor: 'crimson' }}
            onClick={() => {
              setConfirmDialog({
                title: 'Delete customer',
                confirmMessage: 'Do you want to delete this customer?',
                open: true,
                onConfirm: () => {
                  deleteCustomer.mutate({ customerUrl: id });
                },
              });
            }}
          >
            Delete
          </Button>
        );
      },
    },
    {
      field: 'firstname',
      headerName: 'Firstname',
      width: 150,
      // editable: true,
    },
    {
      field: 'lastname',
      headerName: 'Lastname',
      width: 150,
      // editable: true,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 150,
      // editable: true,
    },
    {
      field: 'postcode',
      headerName: 'Postcode',
      width: 150,
      // editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      // editable: true,
    },
    {
      field: 'streetaddress',
      headerName: 'Street address',
      width: 200,
      // editable: true,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 150,
      // editable: true,
    },
  ];

  return (
    <>
      {formStates.open && <CustomerForm {...formStates} handleCloseForm={handleCloseForm} />}
      {trainingForm.open && (
        <TrainingForm {...trainingForm} handleCloseForm={handleCloseTraining} />
      )}
      <ConfirmDialog
        title={confirmDialog.title}
        open={confirmDialog.open}
        onClose={handleCloseConfirm}
        onConfirm={confirmDialog.onConfirm}
      >
        {confirmDialog.confirmMessage}
      </ConfirmDialog>
      <div className='floating-button'>
        <Fab
          color='inherit'
          aria-label='add'
          size='medium'
          variant='extended'
          onClick={handleAddCustomerButton}
        >
          <AddIcon sx={{ mr: 1 }} />
          Add customer
        </Fab>
      </div>
      <div className='grid-layout'>
        <div className='grid-wrapper'>
          {isSuccess ? (
            <DataGrid
              initialState={{
                sorting: {
                  sortModel: [{ field: 'firstname', sort: 'desc' }],
                },
              }}
              columns={columns}
              rows={data?.content}
              getRowId={(row) => (row.internalId = row.links[1].href)}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[7, 15]}
              components={{ Toolbar: GridToolbar }}
              sx={{
                boxShadow: 3,
                border: 2,
                '& .MuiDataGrid-cell:hover': {
                  color: 'darkorchid',
                },
              }}
              // In-line editing
              // editMode='row'
              // editRowsModel={editRowsModel}
              // onEditRowsModelChange={handleEditRowsModelChange}
              // onRowEditCommit={handleRowEditCommit}
            />
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
    </>
  );
};

export default CustomersTable;
