/**
 * 是否支持webp
 * @returns boolean
 */
const checkWebp = (): boolean => {
  try {
    return (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0);
  } catch (err) {
    return false;
  }
};

export default checkWebp;