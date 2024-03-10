import React from 'react';
import { Button } from '@mui/material';

function Logout({ onLogoutClick }) {
  return (
    <Button variant="outlined" color="secondary" onClick={onLogoutClick}>
      Logout
    </Button>
  );
}

export default Logout;