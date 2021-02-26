import React from 'react';

export function PanelButton({ number, floorSelector, disabled, nextFloor }) {
  return (
    <button
      onClick={floorSelector}
      disabled={disabled}
    >
      {number}
    </button>
  );
}
