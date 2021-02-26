import React from 'react';
import { useService } from '@xstate/react';
import { PanelButton } from './PanelButton';
import {
  AiOutlineDownSquare,
  AiOutlineUpSquare,
  AiOutlineMinusSquare,
} from 'react-icons/ai';

export function Panel({ service }) {
  const [state, send] = useService(service);
  const { currentFloor, nextFloor, queue } = state.context;

  function floorSelector(number) {
    send({ type: 'QUEUE', value: number });
  }

  function direction() {
    if (currentFloor > nextFloor) return <AiOutlineDownSquare />;
    if (currentFloor === nextFloor) return <AiOutlineMinusSquare />;
    return <AiOutlineUpSquare />;
  }

  return (
    <section id="controls">
      <div className="display">
        <h1>{currentFloor}</h1>
        <span>{direction()}</span>
      </div>
      <div className="panel">
        {[1, 2, 3, 4].map((floor) => (
          <PanelButton
            floorSelector={() => {
              console.log('clicked');
              floorSelector(floor);
            }}
            number={floor}
            key={`floorButton-${floor}`}
            service={service}
            disabled={state.value !== 'wait'}
          />
        ))}
      </div>
    </section>
  );
}
