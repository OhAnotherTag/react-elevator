import React from 'react';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';

export function Floor({ number, callElevator, state }) {
  const { currentFloor } = state.context;
  const isDisabled = number === currentFloor && state.value != 'idle';
  
  return (
    <div className="floor">
      <div className="number-sign">
        <h2>{number}</h2>
      </div>
      {number != 4 && (
        <button onClick={callElevator} disabled={isDisabled}>
          <AiOutlineCaretUp />
        </button>
      )}
      {number != 1 && (
        <button onClick={callElevator} disabled={isDisabled}>
          <AiOutlineCaretDown />
        </button>
      )}
    </div>
  );
}
