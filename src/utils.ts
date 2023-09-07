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
      if (flag) {
        return flag;
      } else {
        throw data;
      }
    },
  };
}

export function dataFetching1() {
  return {
    data: makeResponse(),
  };
}

export function dataFetching2(str: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(str);
    }, 1000);
  });
}
