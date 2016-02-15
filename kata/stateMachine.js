'use strict';

class StateMachine {
  constructor(states, events) {
    this.current = states[0];
    this.states = states;
    this.events = events;
  }

  _next(action) {
    const current = this.current;
    const event = this.events.filter(function(e) {
      if (action === e.name && e.from === current) {
        return true;
      }
    });
    if (event.length) {
      this.current = event[0].to;
      return this.current;
    }
  }

  next(action) {
    if (!Array.isArray(action)) {
      return this._next(action);
    }

    for (var i = 0; i < action.length; i++) {
      debugger;
      const state = this._next(action[i]);
      if (this.states.indexOf(state) === -1) {
        return 'ERROR';
      }
    }
    return this.current;
  }

  reset() {
    this.current = this.states[0];
  }
}

const states = [
  'CLOSED',
  'LISTEN',
  'SYN_SENT',
  'SYN_RCVD',
  'ESTABLISHED',
  'CLOSE_WAIT',
  'LAST_ACK',
  'FIN_WAIT_1',
  'FIN_WAIT_2',
  'CLOSING',
  'TIME_WAIT',
];
const tcpState = new StateMachine(states, [
  { from: 'CLOSED', name: 'APP_PASSIVE_OPEN', to: 'LISTEN' },
  { from: 'CLOSED', name: 'APP_ACTIVE_OPEN', to: 'SYN_SENT' },
  { from: 'LISTEN', name: 'RCV_SYN', to: 'SYN_RCVD' },
  { from: 'LISTEN', name: 'APP_SEND', to: 'SYN_SENT' },
  { from: 'LISTEN', name: 'APP_CLOSE', to: 'CLOSED' },
  { from: 'SYN_RCVD', name: 'APP_CLOSE', to: 'FIN_WAIT_1' },
  { from: 'SYN_RCVD', name: 'RCV_ACK', to: 'ESTABLISHED' },
  { from: 'SYN_SENT', name: 'RCV_SYN', to: 'SYN_RCVD' },
  { from: 'SYN_SENT', name: 'RCV_SYN_ACK', to: 'ESTABLISHED' },
  { from: 'SYN_SENT', name: 'APP_CLOSE', to: 'CLOSED' },
  { from: 'ESTABLISHED', name: 'APP_CLOSE', to: 'FIN_WAIT_1' },
  { from: 'ESTABLISHED', name: 'RCV_FIN', to: 'CLOSE_WAIT' },
  { from: 'FIN_WAIT_1', name: 'RCV_FIN', to: 'CLOSING' },
  { from: 'FIN_WAIT_1', name: 'RCV_FIN_ACK', to: 'TIME_WAIT' },
  { from: 'FIN_WAIT_1', name: 'RCV_ACK', to: 'FIN_WAIT_2' },
  { from: 'CLOSING', name: 'RCV_ACK', to: 'TIME_WAIT' },
  { from: 'FIN_WAIT_2', name: 'RCV_FIN', to: 'TIME_WAIT' },
  { from: 'TIME_WAIT', name: 'APP_TIMEOUT', to: 'CLOSED' },
  { from: 'CLOSE_WAIT', name: 'APP_CLOSE', to: 'LAST_ACK' },
  { from: 'LAST_ACK', name: 'RCV_ACK', to: 'CLOSED' },
]);

function traverseTCPStates(eventList) {
  tcpState.reset();
  return tcpState.next(eventList);
}
// console.log(tcpState.next(['APP_ACTIVE_OPEN', 'RCV_SYN_ACK', 'RCV_FIN']));
console.log(tcpState.next(["APP_ACTIVE_OPEN","RCV_SYN_ACK","RCV_FIN","APP_CLOSE"]));
