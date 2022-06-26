import React, { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DraggablePaper } from '../DraggablePaper';
import { useConnection } from '../../../state/hooks/useConnection';
import { ActionsContext } from '../../../state/contexts/ActionsContext';
import { CostumersContext } from '../../../state/contexts/CostumersContext';
import { Costumer } from '../../types/Costumer';

interface Props {
  handleClose: () => void;
  open: boolean;
}

const CreateCostumerDialog: React.FC<Props> = ({ handleClose, open }) => {
  const [payload, setPayload] = useState<Costumer>({} as Costumer);

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
      const shouldProceed = validateFields();
      if (shouldProceed) {
        const res = await connection.post(`/create-costumer/`, payload);

        if (res.data.status === 201) {
          showSnackbar('Created! Well done.', 'success');
          updateCostumers();
          handleClose();
        } else {
          showSnackbar('Something went wrong...', 'error');
        }
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

  const [raiseNameError, setRaiseNameError] = useState(false);
  const [raiseEmailError, setRaiseEmailError] = useState(false);
  const [raiseAgeError, setRaiseAgeError] = useState(false);
  const [raiseCompanyError, setRaiseCompanyError] = useState(false);

  const [ageHelperText, setAgeHelperText] = useState('Required');
  const [emailHelperText, setEmailHelperText] = useState('Required');

  const validateFields = useCallback(() => {
    setRaiseEmailError(false);
    setEmailHelperText('');
    setRaiseAgeError(false);
    setAgeHelperText('');
    setRaiseNameError(false);
    setRaiseCompanyError(false);

    const validatePresences =
      payload.age && payload.company && payload.email && payload.name;

    const isAgeValid = payload.age >= 18 && payload.age <= 110;

    const isEmailValid = new RegExp(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      'gi',
    ).test(payload.email);

    if (validatePresences && isEmailValid && isAgeValid) {
      return true;
    } else {
      if (!payload.name) {
        setRaiseNameError(true);
      }

      if (!payload.email) {
        setRaiseEmailError(true);
      }

      if (!payload.company) {
        setRaiseCompanyError(true);
      }

      if (!payload.age) {
        setRaiseAgeError(true);
      }

      if (payload.age && !isAgeValid) {
        setAgeHelperText('Insert a valid age, from 18 to 110.');
        setRaiseAgeError(true);
      }

      if (payload.email && !isEmailValid) {
        setEmailHelperText('Insert a valid email, ex: me@company.com');
        setRaiseEmailError(true);
      }

      return false;
    }
  }, [payload]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={DraggablePaper}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Create Costumer
        </DialogTitle>
        <DialogContent>
          <TextField
            error={raiseNameError}
            helperText="Required"
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
            error={raiseEmailError}
            helperText={emailHelperText}
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChangeInput}
          />
          <TextField
            error={raiseAgeError}
            helperText={ageHelperText}
            margin="dense"
            id="age"
            label="Age"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChangeInput}
          />
          <TextField
            error={raiseCompanyError}
            helperText="Required"
            margin="dense"
            id="company"
            label="Company"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangeInput}
          />
          <TextField
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
          <Button onClick={handleSubmit}>Proceed</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default React.memo(CreateCostumerDialog);
