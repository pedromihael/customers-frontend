import React from 'react';
import { Box } from '@mui/material';
import { SearchAppBar } from '../../../../modules/mui_components/Header';
import { Costumers } from '../../../../layout/partials/material/Costumers';
import { SimplePaper } from '../../../../modules/mui_components/Paper';
import { CostumersContext } from '../../../../state/contexts/CostumersContext';

export const Home = () => {
  const sx = {
    flexGrow: 1,
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
  };

  const { searchedCostumer } = React.useContext(CostumersContext);

  return (
    <SimplePaper sx={sx}>
      <SearchAppBar />
      <Box sx={{ padding: '4rem' }}>
        <Costumers searched={searchedCostumer} />
      </Box>
    </SimplePaper>
  );
};
