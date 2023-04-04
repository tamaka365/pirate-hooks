import { useCallback, useEffect, useState } from 'react';

import Store from '../utils/store';

const store = new Store();

const useSessionStorage = <T extends any = string>(
  key: string,
  options = { serialize: true, scope: 'document' }
) => {
  const [state, setState] = useState<string>();

  useEffect(() => {
    store.on(key, setState);
  }, []);

  const setStore = useCallback((value: any) => {
    store.set(key, value);
  }, []);

  return [state, setStore] as [T, (value?: T) => void];
};

export default useSessionStorage;
