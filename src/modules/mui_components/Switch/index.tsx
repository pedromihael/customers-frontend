import * as React from 'react';
import { MaterialUISwitch } from './style';
import { ColorModeContext } from '../../../state/contexts/MaterialThemeContext';

const label = { inputProps: { 'aria-label': 'Switch theme' } };

export function MUISwitch() {
  const colorMode = React.useContext(ColorModeContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    colorMode.toggleColorMode();
  };

  return (
    <MaterialUISwitch
      onChange={handleChange}
      defaultChecked
      sx={{ m: 1 }}
      {...label}
    />
  );
}
