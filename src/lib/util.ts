/**
 * Utility library stores common function used across multiple function specific
 * libaries.
 */

export function bit_mask(bit_len: number): number {
  /* Create mask */
  let mask = 1;
  let count: number = 0;

  while (count < bit_len) {
    mask = mask << 1;
    mask |= 1;
    count++;
  }

  return mask;
}