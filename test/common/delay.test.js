const delay = require('../../src/common/delay').default

test('延迟2s后返回结果', (done) => {
  function callBack(date) {
    expect(date).toStrictEqual({name: 'join'});
    done();
  }
  delay(2000, {name: 'join'}).then(callBack)
});
