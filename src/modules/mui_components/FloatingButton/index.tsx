import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  onClick: () => void;
}

export const FloatingButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1 },
        position: 'fixed',
        bottom: '5vh',
        right: '5vh',
        '@media(max-width: 768px)': {
          bottom: '2vh',
          right: '2vh',
        },
      }}
    >
      <Fab onClick={onClick} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  );
};
