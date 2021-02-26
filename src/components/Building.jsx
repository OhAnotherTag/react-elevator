import React from 'react';
import { useService } from '@xstate/react';
import { Floor } from "./Floor";

export function Building({ service }) {
  const [state, send] = useService(service);

  function callElevator(number) {
    if (state.value === 'idle')
      send('START');
    send({ type: 'QUEUE', value: number });
  }

  return (
    <section id="floors">
      {[4, 3, 2, 1].map((floor) => (
        <Floor
          number={floor}
          key={`floor-${floor}`}
          service={service}
          callElevator={() => callElevator(floor)} />
      ))}
    </section>
  );
}
