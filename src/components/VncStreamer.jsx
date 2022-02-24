import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { CircularProgress, Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { VncScreen } from 'react-vnc';
import VncUserSessions from './VncUserSessions';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function VncStreamer(props) {
  const [vncKey, setVncKey] = React.useState(0);
  const [viewOnly, setViewOnly] = React.useState(true);
  const [currentSessionTitle, setCurrentSessionTitle] = React.useState('Connecting');
  const [viewOnlyButton, setViewOnlyButton] = React.useState('Remote Control');
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeUsersVisible, setActiveUsersVisible] = React.useState(false);
  const getRandomId = () => parseInt(Math.random() * 100, 10);

  const toggleViewOnly = () => {
    if (viewOnly == true) {
      setViewOnlyButton('View Only');
      setVncKey(getRandomId());
      setViewOnly(!viewOnly);
    } else {
      setViewOnlyButton('Remote Control');
      setVncKey(getRandomId());
      setViewOnly(!viewOnly);
    }
  };

  return (
    <Box>
      <Dialog
        fullScreen
        open={props.isViewerOpen}
        onClick={() => { props.viewToggleRequest(); }}
        TransitionComponent={Transition}
      >
        <AppBar style={{ background: '#000000' }} sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => { props.viewToggleRequest(); }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Box sx={{
              ml: 2, display: 'flex', flexGrow: 1, flexDirection: 'row',
            }}
            >
              <Typography style={{ alignSelf: 'center' }} variant="h6" component="div">
                {(isLoading) ? 'Connecting' : currentSessionTitle}
              </Typography>
              <CircularProgress
                style={{
                  marginLeft: '12px',
                  display: isLoading ? 'block' : 'none',
                }}
              />
            </Box>
            <Button
              autoFocus
              disabled={isLoading}
              variant="outlined"
              color="inherit"
              onClick={() => { setActiveUsersVisible(true); }}
            >
              Other Users
            </Button>
            <Button
              autoFocus
              disabled={isLoading}
              variant="contained"
              color="inherit"
              style={{

                color: '#000000',
                marginLeft: '10px',
              }}
              onClick={toggleViewOnly}
            >
              {viewOnlyButton}
            </Button>
          </Toolbar>
        </AppBar>
        <VncScreen
          key={vncKey}
          url={props.currentSession.wsUrl}
          scaleViewport
          viewOnly={viewOnly}
          background="#000000"
          loadingUI={<Box></Box>}
          onConnect={() => { setIsLoading(false); }}
          onDisconnect={() => { setIsLoading(true); }}
          style={{
            flexGrow: '1',
            background: '#000000',
            width: '100%',
            height: '90%',
          }}
        />
      </Dialog>
      <VncUserSessions
        visibility={activeUsersVisible}
        visibleToggleRequest={() => { setActiveUsersVisible(false); }}
      />
    </Box>
  );
}

export default VncStreamer;
