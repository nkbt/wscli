'use strict';


const WebSocket = require('ws');


exports.wscli = ({host, count, msg, log, end} = {}) => {
  const ws = new WebSocket(host, {
    rejectUnauthorized: false
  });
  let err = undefined;
  let counter = count;

  const onError = error => {
    if (error) {
      end(error);
    }
  };
  ws.on('message', message => {
    if (counter !== 0) {
      log(message);
    }
    if (counter > 0) {
      counter--;
    }
    if (counter === 0) {
      err = null;
      ws.close();
    }
  });
  ws.on('error', onError);
  ws.on('open', () => {
    if (!msg) {
      return;
    }

    try {
      ws.send(msg, onError)
    } catch (error) {
      onError(error);
    }
  });
  ws.on('close', () => {
    if (err === undefined) {
      err = new Error('Server has closed connection');
    }
    end(err);
  });
};
