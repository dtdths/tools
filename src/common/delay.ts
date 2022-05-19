/**
 * 延迟返回
 * @param delayTime 延迟时间（毫秒）
 * @param res 返回内容
 * @returns
 */
const delay = (
  delayTime: number = 25,
  res: any
): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(res);
    }, delayTime);
  });
}

export default delay
