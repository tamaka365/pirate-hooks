import { useCallback } from 'react';
import { useLocalStorage } from '../packages/hooks';
// import useSessionStorage from '../packages/hooks/useSessionStorage';

export default function Demo() {
  const [hello] = useLocalStorage('hello');
  const [world] = useLocalStorage('world');

  return (
    <div>
      <div>hello: {hello}</div>
      <div>world: {world}</div>
    </div>
  );
}
