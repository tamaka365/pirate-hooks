import { useCallback, useEffect, useState } from 'react';

import { store } from '../utils/store';

const useLocalStorage = <T extends any = string>(
  key: string,
  options = { serialize: true, scope: 'document' }
) => {
  const [state, setState] = useState<string>();

  useEffect(() => {
    const eventHandler = (
      event: CustomEvent<{ [K in typeof key]: string }>
    ) => {
      setState(event.detail[key]);
    };

    store.on('state', eventHandler);
  }, []);

  const setStore = useCallback((value: any) => {
    store.set(key, value);
  }, []);

  return [state, setStore] as [T, (value: T) => void];
};

export default useLocalStorage;
