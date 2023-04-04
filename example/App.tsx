import { useCallback, useEffect, useState } from 'react';

import { useLocalStorage } from '../packages/hooks';

import Demo from './Demo';

function App() {
  const [state, setState] = useLocalStorage('hello');

  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 2000);
  }, []);

  const handleClick = useCallback(() => {
    setState(String(Math.random()));
  }, []);

  return (
    <div className="App">
      <button onClick={handleClick}>Change Storage</button>
      {show && <Demo />}
    </div>
  );
}

export default App;
