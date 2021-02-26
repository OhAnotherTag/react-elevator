import React from 'react';
import { useService } from '@xstate/react';

export function Elevator({ service }) {
  const [state, send] = useService(service);
  const { currentFloor, nextFloor, doorIsOpen } = state.context;

  function animationTiming() {
    if (nextFloor > currentFloor) {
      return nextFloor - currentFloor;
    } else {
      return currentFloor - nextFloor;
    }
  }

  return (
    <section id="elevator">
      <div
        style={{
          transition: `all ${animationTiming()}s linear`,
          transform: `translateY(${(4 - nextFloor) * 100}%)`,
        }}
        className="car"
      >
        <div className="door" style={{ width: doorIsOpen ? '90%' : '0' }}></div>
      </div>
    </section>
  );
}
