const arry2Map = require('../../src/common/arry2Map').default

test('以name为key', () => {
  expect(arry2Map([
    {
      name: 'jone',
      age: 18,
      isBoy: true,
    },
    {
      name: 'gerry',
      age: 18,
      isBoy: false,
    },
    {
      name: 'peter',
      age: 19,
      isBoy: true,
    },
  ], 'name')).toStrictEqual({
    jone: {
      name: 'jone',
      age: 18,
      isBoy: true,
    },
    gerry: {
      name: 'gerry',
      age: 18,
      isBoy: false,
    },
    peter:{
      name: 'peter',
      age: 19,
      isBoy: true,
    },
  })
});

test('以不存在的key为key', () => {
  expect(arry2Map([
    {
      name: 'jone',
      age: 18,
      isBoy: true,
    },
    {
      name: 'gerry',
      age: 18,
      isBoy: false,
    },
    {
      name: 'peter',
      age: 19,
      isBoy: true,
    },
  ], 'height')).toStrictEqual({
    undefined: {
      name: 'peter',
      age: 19,
      isBoy: true,
    },
  })
});