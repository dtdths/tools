const pickObj = require('../../src/common/pickObj').default

test('挑出name', () => {
  expect(pickObj({
    name: 'jone',
    age: 18,
    isBoy: true,
  }, ['name', 'height'])).toStrictEqual({
    name: 'jone',
    height: undefined,
  })
});
