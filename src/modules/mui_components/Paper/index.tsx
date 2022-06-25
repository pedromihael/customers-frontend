import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

interface Props {
  children?: any;
  sx?: any;
  elevation?: number;
}

export const SimplePaper: React.FC<Props> = ({
  children,
  sx,
  elevation = 0,
}) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        '& > :not(style)': {
          minWidth: '100vw',
          minHeight: '100vh',
        },
      }}
    >
      <Paper sx={sx} elevation={elevation}>
        {children}
      </Paper>
    </Box>
  );
};
