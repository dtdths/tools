const renameObjKey = require('../../src/common/renameObjKey').default

test('将name改为nick', () => {
  expect(renameObjKey({
    name: 'jone',
    age: 18,
    isBoy: true,
  }, {
    name: 'nick',
    height: 'Height',
  })).toStrictEqual({
    nick: 'jone',
    age: 18,
    isBoy: true,
  })
});

test('删除name', () => {
  expect(renameObjKey({
    name: 'jone',
    age: 18,
    isBoy: true,
  }, {
    name: null,
  })).toStrictEqual({
    age: 18,
    isBoy: true,
  })
});