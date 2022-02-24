import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

function VncUserSessions(props) {
  return (
    <Box>
      <Dialog open={props.visibility} onClose={props.visibleToggleRequest}>
        <DialogTitle>Active Users</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This List consists of Users who are simultaneously using
            this computer.
            <br />
            You may click their profiles to view or
            control their sessions.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default VncUserSessions;
