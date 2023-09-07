let a = 0;

export default function WithJustCountComponent() {
  if (a === 0) console.log('First WithJustCountComponent');

  if (a === 10) console.log('Last WithJustCountComponent');

  if (a === 11) console.log('rendering Done');

  if (a <= 10) {
    throw new Promise((resolve) => {
      console.log('time to sleep in ', `${String(0.1 * a)}.0`.substring(0, 3), ' seconds');
      setTimeout(() => {
        a += 1;
        resolve(1);
      }, a * 100);
    });
  }

  return (
    <>
      <h2>WithJustCountComponent</h2>
      <p>{a}</p>
    </>
  );
}
