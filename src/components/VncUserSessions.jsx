import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';

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
          <Box>
            <List>
              {
                Object.keys(props.availableSessions).map((session, index) => {
                  return (
                    <ListItemButton onClick={() => { props.switchSessionRequest(index); props.visibleToggleRequest(); }}>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={session}
                        secondary="Secondary text"
                      />
                    </ListItemButton>
                  );
                })
              }
            </List>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default VncUserSessions;
