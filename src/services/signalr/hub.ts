import { HubConnection, HubConnectionBuilder, HubConnectionState, IHttpConnectionOptions, JsonHubProtocol, LogLevel } from "@microsoft/signalr"

const API_URL = import.meta.env.VITE_API_URL_DEV;

export let signalrConnection: HubConnection;

const startSignalRConnection = async (connection: HubConnection) => {
    try {
        await connection.start();
        console.assert(connection.state === HubConnectionState.Connected);
        console.log('SignalR connection established', connection.baseUrl);
    }
    catch (err) {
        console.assert(connection.state === HubConnectionState.Disconnected);
        console.log('SignalR connection error:', err)
    }
}

export const getSignalRConnection = async (token: string) => {
    const options: IHttpConnectionOptions = {
        logger: LogLevel.Information,
        accessTokenFactory: () => token
    }

    const connection = new HubConnectionBuilder()
        .withUrl(`${API_URL}/chat`, options)
        .withHubProtocol(new JsonHubProtocol())
        .build();

    connection.onclose(error => {
        console.assert(connection.state === HubConnectionState.Disconnected);
        if (error) {
            console.error('SignalR: connection was closed dut to error', error)
        }
        else {
            console.log('SinglaR: connection was closed')
        }
    })

    connection.onreconnecting(error => {
        console.assert(connection.state === HubConnectionState.Reconnecting);
        console.error('SingnalR: connection lost. Reconnecting...', error);
    })

    connection.onreconnected(connectionId => {
        console.assert(connection.state === HubConnectionState.Connected);
        console.error('SignalR: connection reestablished. Connected with connectionId,', connectionId)
    })

    await startSignalRConnection(connection);

    signalrConnection = connection;

    return signalrConnection;
}