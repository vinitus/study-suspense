import { useRef } from 'react';
import { dataFetching2 } from './utils';

let b = '';
const a = dataFetching2('WithUseRefComponent').then((res) => (b = res));

export default function WithUseRefComponent() {
  console.log('WithUseRefComponent');
  a.then((res) => console.log(res));
  const data = useRef(b);

  console.log('WithUseRefComponent after useState');
  if (data.current === '') {
    throw Promise.resolve(dataFetching2('WithUseRefComponent').then((res) => (b = res)));
  }

  return (
    <>
      <h2>WithUseRefComponent</h2>
      <div>{data.current}</div>
    </>
  );
}
