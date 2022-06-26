import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
  children: any;
  severity: any;
  open: any;
}

export const CustomizedSnackbar: React.FC<Props> = ({
  children,
  severity,
  open,
}) => {
  const [isOpen, setIsOpen] = React.useState(open);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {children}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
