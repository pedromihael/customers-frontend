import React, { useCallback, useState, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Costumer } from '../../types/Costumer';
import { useConnection } from '../../../state/hooks/useConnection';
import { ActionsContext } from '../../../state/contexts/ActionsContext';
import { CostumersContext } from '../../../state/contexts/CostumersContext';

interface Props {
  handleClose: () => void;
  open: boolean;
  costumer: Costumer;
}

const PaperComponent = (props: PaperProps) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
};

const FormDialog: React.FC<Props> = ({ handleClose, open, costumer }) => {
  const [payload, setPayload] = useState({});

  const connection = useConnection();

  const actionsContext = React.useContext(ActionsContext);
  const { getAllCostumers } = React.useContext(CostumersContext);

  const handleChangeInput = useCallback(
    (e: { persist: () => void; target: { id: string; value: string } }) => {
      e.persist();
      setPayload(prev => ({ ...prev, [e.target.id]: e.target.value }));
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    (async () => {
      const res = await connection.patch(
        `/update-costumer/${costumer._id}`,
        payload,
      );

      if (res.data.status === 200) {
        showSnackbar('Updated! Well done.', 'success');
        updateCostumers();
        handleClose();
      } else {
        showSnackbar('Something went wrong...', 'error');
      }
    })();
  }, [payload]);

  const showSnackbar = useCallback((text, severity) => {
    actionsContext.showSnackBar(text, severity);
  }, []);

  const updateCostumers = useCallback(() => {
    (async () => {
      await getAllCostumers();
    })();
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Edit Costumer
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Please be careful.</DialogContentText>
          <TextField
            defaultValue={costumer.name}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangeInput}
          />
          <TextField
            defaultValue={costumer.email}
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChangeInput}
          />
          <TextField
            defaultValue={costumer.age}
            margin="dense"
            id="age"
            label="Age"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChangeInput}
          />
          <TextField
            defaultValue={costumer.company}
            margin="dense"
            id="company"
            label="Company"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangeInput}
          />
          <TextField
            defaultValue={costumer.picture}
            margin="dense"
            id="picture"
            label="Picture (URL)"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangeInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default React.memo(FormDialog);
