const sortByKeyOrders = require('../../src/common/sortByKeyOrders').default

test(`将 ['Adam','Jack', 'Sana', 'Catlin','Alex'] 改为 ['Catlin', 'Jack',.....]`, () => {
  expect(sortByKeyOrders(
    ['Adam', 'Jack', 'Sana', 'Catlin', 'Alex'],
    ['Catlin', 'Jack']
  )).toStrictEqual(['Catlin', 'Jack', 'Adam', 'Sana', 'Alex'])
});

test('根据name，为对象排序', () => {
  expect(sortByKeyOrders(
    [
      {
        name: 'Adam',
        age: 1,
      },
      {
        name: 'Jack',
        age: 2,
      },
      {
        name: 'Sana',
        age: 2,
      },
      {
        name: 'Catlin',
        age: 2,
      },
      {
        name: 'Alex',
        age: 2,
      }
    ],
    ['Catlin', 'Jack'],
    'name'
  )).toStrictEqual([
    {
      name: 'Catlin',
      age: 2,
    },
    {
      name: 'Jack',
      age: 2,
    },
    {
      name: 'Adam',
      age: 1,
    },
    {
      name: 'Sana',
      age: 2,
    },
    {
      name: 'Alex',
      age: 2,
    }
  ])
});
