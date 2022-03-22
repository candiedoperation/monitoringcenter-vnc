import { io } from "socket.io-client";

function getAvailableSessions(computerData, callback) {
    initSocketConnection(computerData, (connectedSocket) => {
        connectedSocket.emit("get_sessions", { requestId: connectedSocket.id, type: 'frontend' });
        connectedSocket.on("get_sessions_reply", (sessions) => {
            connectedSocket.disconnect();
            console.log(`Disconnect to Host Service Attempted`);
            callback(null, sessions);
        });
    })
}

function getSessionData(computerData, sessionId, callback) {
    initSocketConnection(computerData, (connectedSocket) => {
        connectedSocket.emit("get_session_data", { requestId: connectedSocket.id, type: 'frontend', sessionId: sessionId });
        connectedSocket.on("get_session_reply", (sessionInfo) => {
            connectedSocket.disconnect();
            console.log(`Disconnect to Host Service Attempted`);
            callback(null, {
                ...sessionInfo,
                computerData: computerData
            });
        });
    });
}

function initSocketConnection(computerData, callback) {
    const connectedSocket = io(`http://${computerData.address}:${computerData.port}`);
    connectedSocket.on("connect", () => {
        console.log(`Connected to Host Service with ID: ${connectedSocket.id}`)
        callback(connectedSocket)
    })
}

export {
    getAvailableSessions,
    getSessionData
};