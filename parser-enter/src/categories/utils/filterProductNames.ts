export default (products) => {
  const filteredResult = [];

  products.forEach((x) => {
    if (!filteredResult.find((e) => e.name === x.name)) {
      filteredResult.push(x);
    }
  });

  return filteredResult;
};
