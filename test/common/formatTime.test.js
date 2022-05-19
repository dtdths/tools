const formatTime = require('../../src/common/formatTime').default

test('number yyyy-MM-dd hh:mm:ss', () => {
  expect(formatTime(1649742879451)).toBe('2022-04-12 13:54:39');
});

test('Date yyyy/MM/dd', () => {
  expect(formatTime(new Date(1649742879451), 'yyyy/MM/dd')).toBe('2022/04/12');
});

test('string yyyy-MM-dd hh:mm:ss', () => {
  expect(formatTime('1649742879451', 'yyyy-MM-dd hh:mm:ss')).toBe('2022-04-12 13:54:39');
});

