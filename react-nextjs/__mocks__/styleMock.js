module.exports = new Proxy({}, {
  get: () => 'dummyClassName',
});
