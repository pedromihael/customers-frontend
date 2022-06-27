import * as React from 'react';
import { MaterialUISwitch } from './style';
import { ColorModeContext } from '../../../state/contexts/MaterialThemeContext';

const label = { inputProps: { 'aria-label': 'Switch theme' } };

export function MUISwitch(props: any) {
  const colorMode = React.useContext(ColorModeContext);
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    colorMode.toggleColorMode();
  };

  return (
    <MaterialUISwitch
      checked={checked}
      onChange={handleChange}
      defaultChecked
      sx={props.sx}
      {...label}
    />
  );
}
