import axios from 'axios';

function getAvailableSessions(computerData, callback) {
    axios
        .get(`http://${computerData.address}:${computerData.port}/hostcore/getmappedports`, { crossDomain: true })
        .then((hostInfo) => {
            if (Object.keys(hostInfo.data).length === 0) {
                callback({ message: 'No Active Users' });
            } else {
                const availableSessionsBfr = {};
                Object.keys(hostInfo.data).forEach((session) => {
                    const currentSessionBfr = hostInfo.data[session];
                    availableSessionsBfr[currentSessionBfr.userInfo.username] = {
                        computerData: computerData,
                        username: currentSessionBfr.userInfo.username,
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

export {
    getAvailableSessions
};