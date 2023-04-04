import { useCallback, useEffect, useState } from 'react';

import { useLocalStorage } from '../packages/hooks';
// import useSessionStorage from '../packages/hooks/useSessionStorage';

import Demo from './Demo';

function App() {
  const [, setHello] = useLocalStorage('hello');
  const [, setWorld] = useLocalStorage('world');

  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 2000);
  }, []);

  const handleClickHello = useCallback(() => {
    setHello(String(Math.random()));
  }, []);

  const resetHello = useCallback(() => {
    setHello();
  }, []);

  const handleClickWorld = useCallback(() => {
    setWorld(String(Math.random()));
  }, []);

  const resetWorld = useCallback(() => {
    setWorld();
  }, []);

  return (
    <div className="App">
      <div>
        <button onClick={handleClickHello}>Set Hello</button>
        <button onClick={resetHello}>Reset Hello</button>
      </div>
      <div>
        <button onClick={handleClickWorld}>Set World</button>
        <button onClick={resetWorld}>Reset World</button>
      </div>
      {show && <Demo />}
    </div>
  );
}

export default App;
