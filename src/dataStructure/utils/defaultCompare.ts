export enum COMPARE {
  LESS_THAN = -1,
  BIGGER_THAN = 1,
  EQUAL = 0,
};
export function defaultCompare(a: any, b: any) {
  if (a === b) { // {1}
    return COMPARE.EQUAL;
  }
  return a < b ? COMPARE.LESS_THAN : COMPARE.BIGGER_THAN; // {2}
} 