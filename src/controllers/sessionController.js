import axios from 'axios';

function getAvailableSessions(computerData, callback) {
    axios
        .get(`http://${computerData.address}:${computerData.port}/hostcore/getmappedports`, { crossDomain: true })
        .then((hostInfo) => {
            if (Object.keys(hostInfo.data).length === 0) {
                setViewerOpen(false);
                setSnackbarText('No Active Users');
                setSnackbarOpen(true);
            } else {
                const availableSessionsBfr = {};
                Object.keys(hostInfo.data).forEach((session) => {
                    const currentSessionBfr = hostInfo.data[session];
                    availableSessionsBfr[currentSessionBfr.userInfo.username] = {
                        vncPort: +session,
                        mctPort: +currentSessionBfr.mctPort,
                        wsUrl: `${currentSessionBfr.wsProtocol}://${computerData.address}:${currentSessionBfr.mctPort}`,
                    };
                });

                callback(null, availableSessionsBfr);
            }
        })
        .catch((err) => {
            callback(err)
            console.log(`Err: ${err}`);
        });
}

export default getAvailableSessions;