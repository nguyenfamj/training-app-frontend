import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './TrainingForm.css';
import { useAddTrainingMutation } from '../../Services/trainingsAPI';

const TrainingForm = ({ type, open, initialData, handleCloseForm }) => {
  const [form, setForm] = useState(initialData);
  // Edit mutation from React Query

  const addMutation = useAddTrainingMutation();
  const navigate = useNavigate();

  console.log(form);

  const inputs = [
    {
      name: 'date',
      margin: 'dense',
      fullWidth: true,
      type: 'date',
      variant: 'standard',
      value: form.date,
    },
    {
      label: 'Activity',
      name: 'activity',
      margin: 'dense',
      fullWidth: true,
      type: 'text',
      variant: 'standard',
      value: form.activity,
    },
    {
      label: 'Duration',
      name: 'duration',
      margin: 'dense',
      fullWidth: true,
      type: 'number',
      variant: 'standard',
      value: form.duration,
    },
  ];

  const handleInputChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitButton = () => {
    if (type === 'edit') {
    } else if (type === 'add') {
      addMutation.mutate({ data: form });
    }
    handleCloseForm();
    navigate('/trainings');
  };

  return (
    <Dialog open={open} onClose={handleCloseForm}>
      <div className='form-dialog'>
        <DialogTitle>{type === 'edit' ? 'Edit' : type === 'add' ? 'Add' : ''} Training</DialogTitle>
        <DialogContent>
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

export default TrainingForm;
