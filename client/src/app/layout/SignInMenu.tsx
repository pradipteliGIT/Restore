import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { signOut } from '../../features/account/accountSlice';
import { clearBasket } from '../../features/basket/basketSlice';

export default function SignInMenu() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id='basic-button'
        color='inherit'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ typography: 'h6' }}
      >
        {user?.email}
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My orders</MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(signOut());
            dispatch(clearBasket());
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
