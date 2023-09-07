export default function PromiseComponent({
  resource,
}: {
  resource: {
    data: { read(): string };
  };
}) {
  console.log('PromiseComponent');
  const result = resource.data.read();

  console.log(result);

  return (
    <>
      <h1>PromiseComponent</h1>
      <div>{result}</div>
    </>
  );
}
