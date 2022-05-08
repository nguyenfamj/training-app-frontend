import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogContentText,
} from '@mui/material';

import './CustomerForm.css';
import { useCustomerEditMutation, useCustomerAddMutation } from '../../Services/customersAPI';

const CustomerForm = ({ type, open, initialData, handleCloseForm, customerUrl }) => {
  const [form, setForm] = useState(initialData);
  // Edit mutation from React Query
  const editMutation = useCustomerEditMutation();
  const addMutation = useCustomerAddMutation();

  const inputs = [
    {
      label: 'Firstname',
      name: 'firstname',
      margin: 'dense',
      fullWidth: true,
      type: 'text',
      variant: 'standard',
      value: form.firstname,
    },
    {
      label: 'Lastname',
      name: 'lastname',
      margin: 'dense',
      fullWidth: true,
      type: 'text',
      variant: 'standard',
      value: form.lastname,
    },
    {
      label: 'Email',
      name: 'email',
      margin: 'dense',
      fullWidth: true,
      type: 'text',
      variant: 'standard',
      value: form.email,
    },
    {
      label: 'Phone',
      name: 'phone',
      margin: 'dense',
      fullWidth: true,
      type: 'text',
      variant: 'standard',
      value: form.phone,
    },
    {
      label: 'Street address',
      name: 'streetaddress',
      margin: 'dense',
      fullWidth: true,
      type: 'text',
      variant: 'standard',
      value: form.streetaddress,
    },
    {
      label: 'Postcode',
      name: 'postcode',
      margin: 'dense',
      fullWidth: true,
      type: 'text',
      variant: 'standard',
      value: form.postcode,
    },
    {
      label: 'City',
      name: 'city',
      margin: 'dense',
      fullWidth: true,
      type: 'text',
      variant: 'standard',
      value: form.city,
    },
  ];

  const handleInputChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitButton = () => {
    if (type === 'edit') {
      editMutation.mutate({ customerUrl, data: form });
    } else if (type === 'add') {
      addMutation.mutate({ data: form });
    }
    handleCloseForm();
  };

  return (
    <Dialog open={open} onClose={handleCloseForm}>
      <div className='form-dialog-customer'>
        <DialogTitle>{type === 'edit' ? 'Edit' : type === 'add' ? 'Add' : ''} Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>Add/Edit customers</DialogContentText>
          {inputs.map((inputAttribute) => (
            <TextField key={inputAttribute.name} {...inputAttribute} onChange={handleInputChange} />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmitButton}>
            {type === 'edit' ? 'Submit' : type === 'add' ? 'Add' : ''}
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default CustomerForm;
