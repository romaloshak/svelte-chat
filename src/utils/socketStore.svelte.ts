type SocketState = {
  status: string;
  socket: WebSocket | null;
  messages: { sender: string; createdAt: Date; message: string }[];
  tabName: string;
};

export const socketState: SocketState = $state({
  status: 'disconnected',
  socket: null,
  messages: [],
  tabName: `User-${Math.floor(Math.random() * 100)}`,
});

export function initSocket() {
  const ws = new WebSocket('ws://localhost:3000');

  ws.onopen = () => {
    socketState.status = 'connected';
    socketState.socket = ws;
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      socketState.messages.push(data);
    } catch {
      socketState.messages.push(event.data);
    }
  };

  ws.onclose = () => {
    socketState.status = 'disconnected';
    socketState.socket = null;
  };

  return ws;
}
