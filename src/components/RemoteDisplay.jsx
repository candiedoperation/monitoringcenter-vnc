import * as React from 'react';
import { Portal } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import VncStreamer from '../components/VncStreamer';
import MuiAlert from '@mui/material/Alert';
import { getAvailableSessions } from '../controllers/sessionController';

const RemoteDisplay = React.forwardRef((props, ref) => {
    const [viewerOpen, setViewerOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarText, setSnackbarText] = React.useState('');
    const [currentSession, setCurrentSession] = React.useState({ sessionData: {} });
    const [availableSessions, setAvailableSessions] = React.useState({ sessionsData: {} });

    React.useImperativeHandle(ref, () => ({
        RemoteDisplayComputer(computerData) {
            switchComputer(computerData);
        }
    }));

    function switchComputer(computerData) {
        if (computerData) {
            /*(getAvailableSessions(computerData, (err, availSessions) => {
                if (err) {
                    setViewerOpen(false);
                    setSnackbarText(err.message);
                    setSnackbarOpen(true);
                } else {
                    availableSessions.sessionsData = availSessions;

                    switchSession(0);
                    setViewerOpen(true);
                }
            })*/

            switchSession(0);
            setViewerOpen(true);
        } else {
            setViewerOpen(false);
        }
    }

    function switchSession(sessionIndex) {
        setCurrentSession({
            sessionData: availableSessions.sessionsData[
                Object.keys(availableSessions.sessionsData)[sessionIndex]
            ]
        })
    }

    return (
        <Portal>
            <VncStreamer
                isViewerOpen={viewerOpen}
                viewToggleRequest={switchComputer}
            />
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