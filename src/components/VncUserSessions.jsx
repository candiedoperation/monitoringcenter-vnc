import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getAvailableSessions } from '../controllers/sessionController';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import UserIcon from '@mui/icons-material/AccountCircleRounded';
import RefreshIcon from '@mui/icons-material/Refresh';
import { LoadingButton } from '@mui/lab';

function VncUserSessions(props) {
  const [availableSessions, setAvailableSessions] = React.useState([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  function refreshAvailableSessions() {
    if (Object.keys(props.computerData).length > 0) {
      setIsRefreshing(true);
      getAvailableSessions(props.computerData, (err, sessions) => {
        console.log(sessions);
        let availableSessionElements = [];
        Object.keys(sessions).map((session) => {
          availableSessionElements.push(
            <ListItemButton key={session} onClick={() => { props.switchSessionRequest(session); props.visibleToggleRequest(); }}>
            <ListItemAvatar>
              <Avatar style={{ background: "black" }}>
                <UserIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={sessions[session].userInfo.username.toLowerCase().replace(/^(\w)|\s(\w)/g, (regexCase) => regexCase.toUpperCase())}
              secondary={`${props.computerData.name} at ${props.computerData.address}:${sessions[session].vncPort}`}
            />
          </ListItemButton>
          );

          if(Object.keys(sessions).length == availableSessionElements.length) {
            setAvailableSessions(availableSessionElements);
            setIsRefreshing(false);
          }
        });
      })
    }
  }

  React.useEffect(() => {
    refreshAvailableSessions();
  }, [props.computerData]);
  
  return (
    <Box>
      <Dialog open={props.visibility} onClose={props.visibleToggleRequest}>
        <Box style={{ display: 'flex' }}>
          <DialogTitle style={{ alignSelf: 'center', flexGrow: 1, marginTop: '2px' }}>Active Users</DialogTitle>
          <Box style={{ alignSelf: 'center', marginRight: '15px' }}>
            <LoadingButton loading={isRefreshing} onClick={refreshAvailableSessions} variant='outlined'><RefreshIcon/></LoadingButton>
          </Box>
        </Box>
        <DialogContent style={{ paddingTop: '0px'}}>
          <DialogContentText>
            This List consists of Users who are simultaneously using
            this computer.
            <br />
            You may click their profiles to view or
            control their sessions.
          </DialogContentText>
          <Box>
            <List>{availableSessions}</List>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default VncUserSessions;
