/**
 * Two's complement library contains the functions to perform two's complement
 * calculation and translations.
 */

import {bit_mask} from './util';
import {HandlerPacket} from './lib_h';

function handler(packet: HandlerPacket): void {
  // TODO: fill the function handler
}

/**
 * Perform addition of two numbers of certain bit length and return the result 
 * value.
 * 
 * @param lhs Left hand side number
 * @param rhs Right hand side number
 * @param bit_len Bit length of the inputs
 * @param overflow Result should overflow, truncate result if overflow is false
 * @returns
 */
function add(
  lhs: number,
  rhs: number,
  bit_len: number,
  overflow: boolean
): number {
  let mask: number = bit_mask(bit_len);

  if (overflow) {
    /* Overflow is allowed, return addition */
    return (lhs & mask) + (rhs & mask);
  } else {
    /* Return truncated addition */
    return ((lhs & mask) + (rhs & mask)) & bit_mask(bit_len);
  }
}

/**
 * Perform subtraction of two numbers of certain bit length and return the 
 * result value.
 * 
 * @param lhs Left hand side number
 * @param rhs Right hand side number
 * @param bit_len Bit length of the inputs
 * @param overflow Result should overflow, truncate result if overflow is false
 * @returns 
 */
function subtract(
  lhs: number,
  rhs: number,
  bit_len: number,
  overflow: boolean
): number {
  let mask: number = bit_mask(bit_len);

  if (overflow) {
    return (lhs & mask) - (rhs & mask);
  } else {
    /* Return truncated subtraction */
    return ((lhs & mask) - (rhs & mask)) & bit_mask(bit_len);
  }
}

/**
 * Perform modulo 2 arithmetic of two numbers of certain bit length
 * 
 * @param lhs Left hand side number
 * @param rhs Right hand side number
 * @param bit_len Bit length of the input numbers
 * @returns 
 */
function modulo_2(
  lhs: number,
  rhs: number,
  bit_len: number
): number {
  let mask: number = bit_mask(bit_len);
  return (lhs & mask) ^ (rhs & mask);
}

/**
 * Integer to ASCII
 * 
 * @param input Input number
 * @param bit_len Bit length of the input number
 * @param signed Is output signed or unsigned.
 * @param type Output type
 * @returns 
 */
function itoa(input: number, bit_len: number, signed: boolean, type: number): string {
  let mask: number = bit_mask(bit_len);
  input = input & mask; /* Truncate input */

  if (signed) {
    /* Output a signed number */
    if (input & (0x1 << bit_len)) {
      /* Negative number */
      let abs_value: number = (input ^ mask) + 1;
      return '-' + abs_value.toString(type);
    }
  }
    
  return input.toString(type);
}

/**
 * ASCII to integer
 * 
 * @param input Input number
 * @param bit_len Bit length of output number
 * @param type Input type
 * @returns 
 */
function atoi(input: string, bit_len: number, type: number): number {
  let mask: number = bit_mask(bit_len);
  let sign: boolean = false;

  /* Remove all spaces */
  input = input.trim();

  /* Remove all commas */
  input = input.replace(',', '');

  if (input[0] == '-') {
    /* Input is negative number */
    sign = true;
    /* Remove negative sign */
    input = input.substring(1);
  }

  /* Parse input and truncate result */
  let value: number = parseInt(input, type) & mask;

  if (sign) {
    return (value ^ mask) + 1;
  }

  return value;
}

export default {
  handler,
  itoa,
  atoi
};