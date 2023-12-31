import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';

const App = () => {
  const [count, setCount] = useState(0);
  const [samples, setSamples] = useState<{ text: string }[]>([]);

  useEffect(() => {
    getDocs(collection(db, 'sample'))
      .then((snap) => {
        setSamples(snap.docs.map((doc) => doc.data() as { text: string }));
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <div>{JSON.stringify(samples)}</div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;
