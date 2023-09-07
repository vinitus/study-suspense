import { Suspense } from 'react';
import './App.css';
import PromiseComponent from './PromiseComponent';
import WithUseStateComponent from './WithUseStateComponent';
import WithUseRefComponent from './WithUseRefComponent';
import { dataFetching1 } from './utils';

function App() {
  return (
    <>
      <Suspense fallback={<div>PromiseComponent Loading</div>}>
        <PromiseComponent resource={dataFetching1()} />
      </Suspense>
      <Suspense fallback={<div>WithUseStateComponent Loading</div>}>
        <WithUseStateComponent />
      </Suspense>
      <Suspense fallback={<div>WithUseRefComponent Loading</div>}>
        <WithUseRefComponent />
      </Suspense>
    </>
  );
}

export default App;
