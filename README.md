# Suspense를 사용하는 방법

## 실행방법

1. `node -v`

   node 설치 유무 확인 -> 없다면 설치해야함

2. `yarn -v`

   yarn 설치 유무 확인

   없으면

   `npm install -g yarn`

3. `yarn`

   종속성 모듈 설치

4. `yarn dev`

   개발 서버 실행

## 만든 목적

`Suspense` 컴포넌트의 fallback props가 어떤 상황에서 렌더링될까? 를 알아보기 위한 것

## 배운 점

1. `Suspense`의 fallback의 ReactNode가 렌더링 되는 상황

   바로 **children의 컴포넌트가 중단되는 상황**이다. 이는 어디서 중단되냐면 바로 `throw`를 만났을 때이다.

   이 throw가 promise를 던지면, 렌더링이 중단되고 컴포넌트가 다시 평가된다. 재평가가 아니라 다시 평가되기 때문에, 함수가 다시 실행된다. 때문에 `useState`의 상태를 업데이트하는 `dispatch`함수도 사용할 수 없다. 이유는 마운트 전에 이를 활용하려고 하면 에러를 던지기 때문이다.

   렌더링이 중단된다고 하는 것은 아무것도 렌더링하지 않는 것을 포함하지 않는다.

   ```tsx
   import { Suspense } from 'react';

   function TmpComponent() {
     const flag = false;
     return <>{flag ? <div>Hi</div> : null}</>;
   }

   export default function App() {
     return (
       <>
         <h2>App</h2>
         <Suspense fallback={<div>Loading...</div>}>
           <TmpComponent />
         </Suspense>
       </>
     );
   }
   ```

   이런 상황이라고 해서 이를 감싸고 있는 Suspense 컴포넌트의 fallback이 렌더링되지 않는다는 것이다.

   또, throw에 new Error()를 통해서 에러를 던지게 된다거나 다른 값이나 함수를 던지게 되면, 그건 진짜로 Error다.

   ```tsx
   import { Suspense } from 'react';

   function TmpComponent({ flag }: { flag: boolean }) {
     if (flag === false) throw new Error();
     return <div>Hi</div>;
   }

   export default function App() {
     return (
       <>
         <h2>App</h2>
         <Suspense fallback={<div>Loading...</div>}>
           <TmpComponent flag={false} />
         </Suspense>
       </>
     );
   }
   ```

   이건 진짜로 에러가 떠버린다.

   즉, Suspense는 비동기에 관한 핸들링 컴포넌트인 것이다.

2. Promise 그 자체만으로는 아무것도 할 수 없다.

   반드시 조건에 따라서 Promise를 throw해야하는데, 우리가 원하는 값을 가지게 되는 값만으로는 할 수 없다.

   이게 무슨 말인가하면, Promise는 결국 약속이다. 이 약속 만으로는 resolve에 들어가는 인자를 꺼내올 수 없다는 것이다.

   ```javascript
   const promise1 = new Promise((resolve) => resolve(1));
   ```

   promise1의 resolve에 들어가는 1을 꺼내올 수 있는 방법은 다음과 같다.

   ```javascript
   function makePromise(f) {
     return f ? new Promise((resolve) => resolve(1)).then((prev) => f(prev)) : new Promise((resolve) => resolve(1));
   }

   // 첫번째 방법
   let one = 0;
   const promise1 = makePromise((a) => (one = a));

   setTimeout(() => {
     console.log(one);
   }, 0);

   // 두번째 방법
   let one = 0;
   async function asyncFn1() {
     const tmp = await makePromise();
     one = tmp;
   }

   asyncFn1();

   setTimeout(() => {
     console.log(one);
   }, 0);

   // 세번째 방법
   function justFn1() {
     let value = null;
     const promise2 = makePromise((a) => (value = a));

     return {
       read() {
         if (value === null) throw promise2;
         else return value;
       },
     };
   }

   const getValueFn = justFn1();
   setTimeout(() => {
     const one = getValueFn.read();
     console.log(one);
   }, 0);
   ```

   이렇게 가져올 수 있다. 즉, Promise 만 가지고는 아무것도 할 수 없다. Promise 객체를 가지고 조건문을 걸 수 있을까? 없다. Promise는 비동기를 제어하기 위한 매커니즘이다.

   이 값을 꺼내서, 언제든지 확인 할 수 있어야한다.

   여기서 Suspense는, throw Promise를 캐치한다. 이를 캐치하면, fallback 함수를 렌더링하고, 이 promise가 resolve될 때에 다시 컴포넌트함수를 실행시킨다.

   WithJustCountComponent에서 이를 잘 확인할 수 있다.
