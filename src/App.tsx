import { Suspense } from 'react';
import './App.css';
import PromiseComponent from './PromiseComponent';
import WithUseStateComponent from './WithUseStateComponent';
import WithUseRefComponent from './WithUseRefComponent';
import WithJustCountComponent from './WithJustCountComponent';
import { dataFetching1 } from './utils';

function App() {
  return (
    <div>
      <Suspense fallback={<h3>PromiseComponent Loading</h3>}>
        <PromiseComponent resource={dataFetching1()} />
      </Suspense>
      <hr style={{ margin: '20px 0px' }} />
      <Suspense fallback={<h3>WithUseStateComponent Loading</h3>}>
        <WithUseStateComponent />
      </Suspense>
      <hr style={{ margin: '20px 0px' }} />
      <Suspense fallback={<h3>WithUseRefComponent Loading</h3>}>
        <WithUseRefComponent />
      </Suspense>
      <hr style={{ margin: '20px 0px' }} />
      <Suspense fallback={<h3>WithJustCountComponent Loading</h3>}>
        <WithJustCountComponent />
      </Suspense>
    </div>
  );
}

export default App;
