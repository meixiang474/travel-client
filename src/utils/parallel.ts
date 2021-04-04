export const parallel = (promises: Promise<any>[]) => {
  return Promise.all(
    promises.map(
      (promise) =>
        new Promise((resolve, reject) => {
          promise.then(resolve, resolve);
        })
    )
  );
};
