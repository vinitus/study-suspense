import { Suspense } from 'react';
import './App.css';
import PromiseComponent from './PromiseComponent';

function App() {
  return (
    <>
      <Suspense fallback={<div>PromiseComponent Loading</div>}>
        <PromiseComponent resource={dataFetching()} />
      </Suspense>
    </>
  );
}

function makeResponse() {
  let flag = '';
  const data = new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('Promise Resolve');
    }, 1000);
  }).then((res) => {
    flag = res;
  });

  return {
    read() {
      console.log(flag, data);
      if (flag) {
        return flag;
      } else {
        throw data;
      }
    },
  };
}

function dataFetching() {
  return {
    data: makeResponse(),
  };
}

export default App;
