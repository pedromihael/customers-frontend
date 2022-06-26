import React, { useCallback, useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DraggablePaper } from '../DraggablePaper';
import { Costumer } from '../../types/Costumer';
import { useConnection } from '../../../state/hooks/useConnection';
import { ActionsContext } from '../../../state/contexts/ActionsContext';
import { CostumersContext } from '../../../state/contexts/CostumersContext';

interface Props {
  handleClose: () => void;
  open: boolean;
  costumer: Costumer;
}

const DeleteCostumerDialog: React.FC<Props> = ({
  handleClose,
  open,
  costumer,
}) => {
  const connection = useConnection();

  const actionsContext = React.useContext(ActionsContext);
  const { getAllCostumers } = React.useContext(CostumersContext);

  const handleSubmit = useCallback(() => {
    (async () => {
      const res = await connection.delete(`/delete-costumer/${costumer._id}`);

      if (res.data.status === 200) {
        showSnackbar('Deleted! Well done.', 'success');
        updateCostumers();
        handleClose();
      } else {
        showSnackbar('Something went wrong...', 'error');
      }
    })();
  }, []);

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
        PaperComponent={DraggablePaper}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {`Are you sure you want to delete ${costumer.name}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action is irreversible, please be careful.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Proceed</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default React.memo(DeleteCostumerDialog);
