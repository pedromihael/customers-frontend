import React from 'react';
import { Box } from '@mui/material';
import { SearchAppBar } from '../../../../modules/mui_components/Header';
import { Costumers } from '../../../../layout/partials/material/Costumers';
import { SimplePaper } from '../../../../modules/mui_components/Paper';
import { CostumersContext } from '../../../../state/contexts/CostumersContext';
import { ActionsContext } from '../../../../state/contexts/ActionsContext';
import { CustomizedSnackbar } from '../../../../modules/mui_components/Snackbar';

export const Home = () => {
  const sx = {
    flexGrow: 1,
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
  };

  const { searchedCostumer } = React.useContext(CostumersContext);
  const { snackbarConfig, open } = React.useContext(ActionsContext);

  return (
    <>
      <CustomizedSnackbar severity={snackbarConfig.severity} open={open}>
        {snackbarConfig.text}
      </CustomizedSnackbar>
      <SimplePaper sx={sx}>
        <SearchAppBar />
        <Box sx={{ padding: '4rem' }}>
          <Costumers searched={searchedCostumer} />
        </Box>
      </SimplePaper>
    </>
  );
};
