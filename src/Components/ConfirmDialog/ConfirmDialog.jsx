import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ConfirmDialog = ({ title, children, open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id='confirm-dialog'>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={onClose} sx={{ bgcolor: 'slategray' }}>
          No
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
