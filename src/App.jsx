import React, { useState, useEffect } from 'react';
import { useMachine } from '@xstate/react';
import './styles/App.scss';
import { Panel } from './components/Panel';
import { Elevator } from './components/Elevator';
import { Building } from './components/Building';
import { ElevatorMachine } from './states/ElevatorMachine';

function App() {
  const [state, send, service] = useMachine(ElevatorMachine);

  return (
    <main className="app">
      <Panel service={service} />
      <Elevator service={service} />
      <Building service={service} />
    </main>
  );
}

export default App;
