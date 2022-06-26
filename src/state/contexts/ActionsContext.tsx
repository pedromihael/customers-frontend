import * as React from 'react';

interface Props {
  children: any;
}

interface ActionsProviderProps {
  showSnackBar: (text: string, severity: any) => void;
  snackbarConfig: { text: string; severity: any };
  open: boolean;
}

export const ActionsContext = React.createContext({} as ActionsProviderProps);

const ActionsProvider: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [snackbarConfig, setSnackbarConfig] = React.useState({
    text: 'Sample text',
    severity: 'info',
  });

  const showSnackBar = React.useCallback((text: string, severity: any) => {
    setSnackbarConfig({ text, severity });
    setOpen(true);
  }, []);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [open]);

  return (
    <ActionsContext.Provider
      value={{
        showSnackBar,
        snackbarConfig,
        open,
      }}
    >
      {children}
    </ActionsContext.Provider>
  );
};

export default ActionsProvider;
