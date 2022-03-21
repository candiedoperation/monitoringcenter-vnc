import axios from 'axios';

function getAvailableSessions(computerData, callback) {
    axios
        .get(`http://${computerData.address}:${computerData.port}/api/sessions`, { crossDomain: true })
        .then((hostInfo) => {
            if (Object.keys(hostInfo.data).length === 0) {
                callback({ message: 'No Active Users' });
            } else {
                let availableSessionsBfr = {};
                Object.keys(hostInfo.data).forEach((session) => {
                    let currentSessionBfr = hostInfo.data[session];
                    if (availableSessionsBfr[currentSessionBfr.userInfo.username])
                        currentSessionBfr.userInfo.username =
                            `${currentSessionBfr.userInfo.username} (${computerData.address}:${currentSessionBfr.vncPort})`

                    availableSessionsBfr[currentSessionBfr.userInfo.username] = {
                        computerData: computerData,
                        username: currentSessionBfr.userInfo.username,
                        vncPort: currentSessionBfr.vncPort,
                        wsUrl: `${currentSessionBfr.wsProtocol}://${computerData.address}:${currentSessionBfr.vncPort}`,
                    };

                    if (Object.keys(availableSessionsBfr).length == Object.keys(hostInfo.data).length)
                        callback(null, availableSessionsBfr);
                });
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