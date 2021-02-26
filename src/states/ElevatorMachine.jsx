import { Machine, assign } from 'xstate';

function calcDelay(nextFloor, currentFloor) {
  if (nextFloor > currentFloor) {
    return (nextFloor - currentFloor) * 1000;
  } else {
    return (currentFloor - nextFloor) * 1000;
  }
}

export const ElevatorMachine = Machine(
  {
    id: 'elevator',
    context: {
      currentFloor: 1,
      nextFloor: 1,
      queue: [],
      doorIsOpen: false,
      idle: true,
    },
    initial: 'idle',
    states: {
      idle: {
        entry: ['reset'],
        on: {
          START: 'active',
        },
      },
      active: {
        entry: ['setCurrentFloor', 'setActive'],
        after: {
          100: {
            cond: 'notEmptyQueue',
            target: 'closeDoor',
          },
        },
      },
      wait: {
        entry: ['setCurrentFloor'],
        exit: ['setCurrentFloor'],
        on: {
          'NEXT-FLOOR': {
            actions: ['setNextFloor'],
            after: {
              250: 'closeDoor',
            },
          },
        },
        after: {
          2500: {
            target: 'closeDoor',
            cond: 'notEmptyQueue',
          },
          5000: {
            target: 'closeDoor',
          },
        },
      },
      openDoor: {
        entry: ['removeFromQueue'],
        after: {
          300: { target: 'wait', actions: 'openDoor' },
        },
      },
      closeDoor: {
        entry: ['closeDoor'],
        after: {
          300: [
            {
              cond: 'emptyQueue',
              target: 'moving',
              actions: ['goToFirst', 'setIdle'],
            },
            { target: 'moving' },
          ],
        },
      },
      moving: {
        always: [{ target: 'changingFloor', actions: ['nextFromQueue'] }],
      },
      changingFloor: {
        after: {
          1000: 'floorTransition',
        },
      },
      floorTransition: {
        always: [
          {
            cond: 'isIdle',
            target: 'idle',
          },
          {
            cond: 'sameFloor',
            target: 'openDoor',
          },
          {
            actions: 'changeFloor',
            target: 'changingFloor',
          },
        ],
      },
    },
    on: {
      QUEUE: {
        actions: ['addToQueue'],
      },
    },
  },
  {
    actions: {
      openDoor: assign({
        doorIsOpen: true,
      }),
      closeDoor: assign({
        doorIsOpen: false,
      }),
      goToFirst: assign({
        queue: [1],
      }),
      reset: assign({
        nextFloor: 1,
        doorIsOpen: false,
        currentFloor: 1,
        queue: [],
      }),
      setActive: assign({
        idle: false,
      }),
      setIdle: assign({
        idle: true,
      }),
      setNextFloor: assign({
        queue: (ctx, e) => [...ctx.queue, e.value],
      }),
      setCurrentFloor: assign({
        currentFloor: (ctx) => ctx.nextFloor,
      }),
      nextFromQueue: assign({
        nextFloor: (ctx) => {
          if (!ctx.queue.length) return ctx.currentFloor;
          return ctx.queue[0];
        },
      }),
      addToQueue: assign({
        queue: (ctx, e) => ctx.queue.concat(e.value),
      }),
      removeFromQueue: assign({
        queue: (ctx, e) => {
          if (!ctx.queue.length) return [];
          return ctx.queue.filter((q, i) => i != 0);
        },
      }),
      changeFloor: assign({
        currentFloor: (ctx) => {
          if (ctx.currentFloor > ctx.nextFloor) {
            return ctx.currentFloor - 1;
          }

          if (ctx.currentFloor === ctx.nextFloor) {
            return ctx.currentFloor;
          }
          return ctx.currentFloor + 1;
        },
      }),
    },
    delays: {
      FLOOR_DELAY: (ctx, e) => calcDelay(ctx.nextFloor, ctx.currentFloor),
    },
    guards: {
      notEmptyQueue: (ctx) => ctx.queue.length,
      emptyQueue: (ctx) => !ctx.queue.length,
      isDoorOpen: (ctx) => ctx.doorIsOpen,
      sameFloor: (ctx) => ctx.currentFloor === ctx.nextFloor,
      isIdle: (ctx) => ctx.idle && ctx.currentFloor === 1,
    },
  },
);
