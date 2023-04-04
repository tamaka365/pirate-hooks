type stateType = Record<string, any>;

const $$state: Record<symbol, any> = {};

export default class Store {
  #key = Symbol('key');
  #target = new EventTarget();

  #createEvent(state: stateType) {
    return new CustomEvent('state', {
      detail: state,
    });
  }

  set(key: string, value: stateType) {
    const oldState = $$state[this.#key];
    $$state[this.#key] = { ...oldState, [key]: value };
    this.#target.dispatchEvent(this.#createEvent($$state[this.#key]));
  }

  on(key: string, listener: any) {
    const state = $$state[this.#key];

    if (state) {
      listener(state[key]);
    }

    this.#target.addEventListener('state', event => {
      const { detail } = event as any as { detail: stateType };
      listener(detail[key]);
    });
  }
}
