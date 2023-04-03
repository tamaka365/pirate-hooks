import { useCallback, useEffect, useRef } from 'react';

type CallbackFn = (this: any, ...args: any[]) => any;

export default function useMemoizedCallback(callback: CallbackFn) {
  const ref = useRef<CallbackFn>(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  return useCallback(function (this: any, ...args: any[]) {
    return ref.current.apply(this, args);
  }, []);
}
