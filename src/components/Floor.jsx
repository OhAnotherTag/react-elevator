import React from 'react';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';

export function Floor({ number, callElevator }) {
  return (
    <div className="floor">
      <div className="number-sign">
        <h2>{number}</h2>
      </div>
      {number != 4 && (
        <button onClick={callElevator}>
          <AiOutlineCaretUp />
        </button>
      )}
      {number != 1 && (
        <button onClick={callElevator}>
          <AiOutlineCaretDown />
        </button>
      )}
    </div>
  );
}
