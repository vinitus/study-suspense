import { useState } from 'react';
import { dataFetching2 } from './utils';

let b = '';
dataFetching2('WithUseStateComponent').then((res) => (b = res));

export default function WithUseStateComponent() {
  console.log('WithUseStateComponent');
  const [data, setData] = useState(() => {
    console.log('b = ', b, ', typeof ', typeof b);
    return b;
  });

  console.log('WithUseStateComponent after useState');

  if (data === '') {
    throw Promise.resolve(dataFetching2('WithUseStateComponent').then((res) => (b = res)));
  }

  return (
    <>
      <h2>WithUseStateComponent</h2>
      <div>{data}</div>
    </>
  );
}
