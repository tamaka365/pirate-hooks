import { useCallback } from 'react';
import { useLocalStorage } from '../packages/hooks';

export default function Demo() {
  const [state] = useLocalStorage('hello');

  return (
    <div>
      <div>state: {state}</div>
    </div>
  );
}
