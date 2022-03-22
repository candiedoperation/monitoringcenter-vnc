import * as React from 'react';
import { Portal, Box } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Snackbar from "@mui/material/Snackbar";
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { VncScreen } from 'react-vnc';
import VncUserSessions from './VncUserSessions';
import MuiAlert from '@mui/material/Alert';
import { getAvailableSessions, getSessionData } from '../controllers/sessionController';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
const RemoteDisplay = React.forwardRef((props, ref) => {
    const [viewOnly, setViewOnly] = React.useState(true);
    const [viewOnlyButton, setViewOnlyButton] = React.useState('Remote Control');
    const [isLoading, setIsLoading] = React.useState(true);
    const [activeUsersVisible, setActiveUsersVisible] = React.useState(false);
    const getRandomId = () => parseInt(Math.random() * 100, 10);

    const [viewerOpen, setViewerOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarText, setSnackbarText] = React.useState('');
    const [sessionData, setSessionData] = React.useState({
        renderKey: "init",
        wsProtocol: "",
        computerData: {},
        vncPort: ""
    });

    React.useImperativeHandle(ref, () => ({
        RemoteDisplayComputer(computerData) {
            switchComputer(computerData);
        }
    }));

    function switchComputer(computerData) {
            getAvailableSessions(computerData, (err, sessions) => {
                if (err) {
                    setViewerOpen(false);
                    setSnackbarText(err.message);
                    setSnackbarOpen(true);
                } else {
                    console.log(sessions); //REmove on Debug
                    switchSession(computerData, Object.keys(sessions)[0])
                    setViewerOpen(true);
                }
            })
    }

    function switchSession(computerData, sessionId) {
        getSessionData(computerData, sessionId, (err, sessionData) => {
            console.log(sessionData);
            setSessionData({ renderKey: sessionId + "_viewonly", ...sessionData })
        })
    }


    const toggleViewOnly = () => {
        if (viewOnly == true) {
            setViewOnlyButton('View Only');
            setViewOnly(!viewOnly);
            setSessionData({ ...sessionData, renderKey: sessionData.renderKey + "_remote" })
        } else {
            setViewOnlyButton('Remote Control');
            setViewOnly(!viewOnly);
            setSessionData({ ...sessionData, renderKey: sessionData.renderKey + "_viewonly" })
        }
    };

    return (
        <Portal>
            <Box>
                <Dialog
                    fullScreen
                    open={viewerOpen}
                    TransitionComponent={Transition}
                >
                    <AppBar style={{ background: '#000000' }} sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={() => { setViewerOpen(false) }}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Box sx={{
                                ml: 2, display: 'flex', flexGrow: 1, flexDirection: 'row',
                            }}
                            >
                                <Typography style={{ alignSelf: 'center' }} variant="h6" component="div">
                                    {(isLoading) ? 'Connecting' : (`${sessionData.userInfo.username} at ${sessionData.computerData.name}`)}
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
                                onClick={switchComputer}
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
                        key={sessionData.renderKey}
                        url={`${sessionData.wsProtocol}://${sessionData.computerData.address}:${sessionData.vncPort}`}
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
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => { setSnackbarOpen(false); }}
            >
                <MuiAlert elevation={6} variant="filled" severity="error">{snackbarText}</MuiAlert>
            </Snackbar>
        </Portal>
    );
});

export default RemoteDisplay;