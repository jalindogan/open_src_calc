/**
 * Two's complement library contains the functions to perform two's complement
 * calculation and translations.
 */

import {bit_mask} from 'util';

/**
 *
 * @param lhs Left hand side number
 * @param rhs Right hand side number
 * @param bit_len Bit length of the inputs
 * @param overflow Result should overflow, concat result if overflow is false
 * @returns
 */
function add(
  lhs: number,
  rhs: number,
  bit_len: number,
  overflow: boolean
): number {
  if (overflow) {
    /* Overflow is allowed, return addition */
    return lhs + rhs;
  } else {
    /* Return concated addition */
    return (lhs + rhs) & mask;
  }
}

function subtract(
  lhs: number,
  rhs: number,
  bit_len: number,
  overflow: boolean
): number {
  if (overflow) {
    return lhs - rhs;
  } else {

  }
}
