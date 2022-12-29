// let middleware = [];

// middleware.push((next) => {
//   console.log(1);
//   next();
//   console.log(1.1)
// });
// middleware.push((next) => {
//   console.log(2);
//   next();
//   console.log(2.1)
// });
// middleware.push((next) => {
//   console.log(3);
//   next();
//   console.log(3.1)
// });
// 1 2 3 3.1 2.1 1.1
// compose(middleware)();


type Middleware = [(next?: () => void) => void]
function compose(arr: Middleware) {
  return arr.reduceRight((pv, cv) => () => cv(pv), () => { })
}

// function compose([fn, ...fn2]: [Middleware]) {
//   return () => fn?.(compose(fn2 as unknown as [Middleware])); 
// }

export default compose;