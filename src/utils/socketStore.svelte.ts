type SocketState = {
  status: string;
  socket: WebSocket | null;
  chat: { createdAt: Date; message: string }[];
  tabName: string;
};

export const socketState: SocketState = $state({
  status: 'disconnected',
  socket: null,
  chat: [],
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
      socketState.chat.push(data);
    } catch {
      socketState.chat.push(event.data);
    }
  };

  ws.onclose = () => {
    socketState.status = 'disconnected';
    socketState.socket = null;
  };

  return ws;
}
