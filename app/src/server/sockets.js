import SocketIO from 'socket.io';
import { find } from 'lodash';

import { LOGIN } from '../constants/socket-events';

let io;
let clients = {};

export function initSockets(server) {
  if (!io) {
    io = SocketIO(server);
    io.on('connection', clientConnected);
  }
}


function clientConnected(client) {
  const id = client.id;
  console.log('Client connected:', id);

  clients[id] = {
    client,
  };

  client.on(LOGIN, clientLogin);
  client.on('disconnect', clientDisconnected);
}

function clientLogin(profile) {
  console.log('Client login:', profile);

  const client = clients[this.id];
  if (!client) {
    console.log('Client is gone');
    return;
  }

  client.profile = profile;
}

function clientDisconnected() {
  console.log('Client disconnected:', this.id);
  delete clients[this.id];
}

export function messageClient(publicKey, message, data) {
  console.log('Messaging client');

  // find the client by public key
  const client = find(clients, client => {
    const profile = client.profile;
    if (!profile) return false;
    return profile.publicKey === publicKey;
  });

  if (!client) {
    console.log('Client not connected');
    return;
  }

  client.client.emit(message, data);
}
