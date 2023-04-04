interface Store<K extends string = string, R extends any = any> {
  set: (key: K, value: R) => void;
  on: (
    key: 'state',
    receiver: (event: CustomEvent<{ [k in K]: R }>) => void
  ) => void;
}

type State = Record<string, any>;

const newEvent = (state: State) =>
  new CustomEvent('state', {
    detail: state,
  });

const state: State = {};

export const store = new Proxy(new EventTarget(), {
  get(target: EventTarget, prop: string) {
    if (prop === 'on') {
      const value = target['addEventListener'];
      return function (...args: any) {
        if (args[0] === 'state') {
          value.apply(target, args);

          target.dispatchEvent(newEvent(state));
        }
      };
    }
    if (prop === 'set') {
      return function (key: string, value: any) {
        state[key] = value;

        return target.dispatchEvent(newEvent(state));
      };
    }
  },
}) as any as Store;
