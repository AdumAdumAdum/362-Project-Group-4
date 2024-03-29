import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export function LoggedInNavBar({ username, profilePicture, onClick, onDelete }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component="nav"
        sx={{
          background: 'rgba(249, 246, 246, 0.7)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'saturate(180%) blur(20px)',
          border: '1px solid rgba(249, 246, 246, 0.35)',
          color: '#2b2b2b',
        }}
      >
        <Toolbar sx={{ maxWidth: '1200px', width: '100%', margin: 'auto' }}>
          <Button
            component={RouterLink}
            to="/dashboard"
            sx={{
              color: 'inherit',
              fontWeight: '600',
              fontSize: '1.25em',
              display: {
                xs: 'none',
                sm: 'block',
              },
            }}
          >
            <Box component="img" sx={{
            height: '55px',
            width: "auto"}} 
            src="https://cdn.discordapp.com/attachments/1099351320172957798/1099362997325021193/estatelogo.png" />
          </Button>
          <Button component={RouterLink} sx={{ margin: '0 auto' }}
            to="/feed">Feed</Button>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <Avatar alt={`{username}'s Profile Picture`}
          src={profilePicture} />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={onClick}>Logout</MenuItem>
              <MenuItem onClick={onDelete}>Delete Account</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
