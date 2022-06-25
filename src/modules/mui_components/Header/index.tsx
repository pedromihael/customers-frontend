import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { MUISwitch } from '../Switch';
import { Search, SearchIconWrapper, StyledInputBase } from './style';
import { useABTest } from '../../../state/hooks/useABTest';
import { CostumersContext } from '../../../state/contexts/CostumersContext';

export function SearchAppBar() {
  const handleClick = useABTest();
  const costumersContext = React.useContext(CostumersContext);
  const mobileMenuId = 'primary-search-account-menu-mobile';

  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearch = React.useCallback(
    e => {
      e.preventDefault();
      costumersContext.setSearched(e.target.value);
    },
    [costumersContext],
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 8 new mails" color="inherit">
          <Badge badgeContent={8} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
        >
          <Badge badgeContent={11} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            COSTUMERS
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={handleSearch}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}
          >
            <MUISwitch />
            <IconButton
              data-tip={`We're testing a new feature. \n Would you like to see notifications here? \nJust click and help us!`}
              onClick={() =>
                handleClick('messages', window.navigator.userAgent)
              }
              size="large"
              aria-label="show 8 new mails"
              color="inherit"
            >
              <Badge badgeContent={8} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              data-tip={`We're testing a new feature. \n Would you like to see notifications here? \nJust click and help us!`}
              onClick={() =>
                handleClick('notifications', window.navigator.userAgent)
              }
              size="large"
              aria-label="show 11 new notifications"
              color="inherit"
            >
              <Badge badgeContent={11} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
