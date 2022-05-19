const getUa = () => window && window.navigator ? navigator.userAgent : "";

export default getUa;