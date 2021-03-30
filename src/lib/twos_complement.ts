/**
 * Two's complement library contains the functions to perform two's complement
 * calculation and translations.
 */

import {bit_mask} from './util';
import {HandlerPacket} from './lib_h';

function handler(packet: HandlerPacket, output: Element): void {
  let lhsInput: number;
  let rhsInput: number;
  let bitSize: number;
  let result: number;

  /* Check bit size format */
  if (!packet.bitSize.match(/^[0-9]+$/)) {
    output.innerHTML = 'Bit size is not a valid number.';
    return;
  }

  bitSize = parseInt(packet.bitSize, 10);

  /* Type check input */
  switch (packet.inType) {
    case 'Binary':
      if (!packet.lhsInput.match(/^-?[01]+$/)) {
        /* Left hand side input is not a valid binary number */
        output.innerHTML = 'Left hand side input is not a valid binary number.';
        return;
      }

      if (!packet.rhsInput.match(/^-?[01]+$/)) {
        /* Left hand side input is not a valid binary number */
        output.innerHTML = 'Right hand side input is not a valid binary number.';
        return;
      }

      /* Conversion */
      lhsInput = atoi(packet.lhsInput, bitSize, 2);
      rhsInput = atoi(packet.rhsInput, bitSize, 2);
      break;
    case 'Octal':
      if (!packet.lhsInput.match(/^-?[0-7]+$/)) {
        /* Left hand side is not a valid octal number */
        output.innerHTML = 'Left hand side input is not a valid octal number.';
        return;
      }

      if (!packet.rhsInput.match(/^-?[0-7]+$/)) {
        /* Left hand side is not a valid octal number */
        output.innerHTML = 'Right hand side input is not a valid octal number.';
        return;
      }

      /* Conversion */
      lhsInput = atoi(packet.lhsInput, bitSize, 8);
      rhsInput = atoi(packet.rhsInput, bitSize, 8);
      break;
    case 'Hexadecimal':
      if (!packet.lhsInput.match(/^-?[0-9a-fA-F]+$/)) {
        /* Left hand side is not a valid octal number */
        output.innerHTML = 'Left hand side input is not a valid hexadecimal number.';
        return;
      }

      if (!packet.rhsInput.match(/^-?[0-9a-fA-F]+$/)) {
        /* Left hand side is not a valid octal number */
        output.innerHTML = 'Right hand side input is not a valid hexadecimal number.';
        return;
      }

      /* Conversion */
      lhsInput = atoi(packet.lhsInput, bitSize, 16);
      rhsInput = atoi(packet.rhsInput, bitSize, 16);
      break;
    case 'Decimal':
      if (!packet.lhsInput.match(/^-?[0-9]+$/)) {
        /* Left hand side is not a valid octal number */
        output.innerHTML = 'Left hand side input is not a valid decimal number.';
        return;
      }

      if (!packet.rhsInput.match(/^-?[0-9]+$/)) {
        /* Left hand side is not a valid octal number */
        output.innerHTML = 'Right hand side input is not a valid decimal number.';
        return;
      }

      /* Conversion */
      lhsInput = atoi(packet.lhsInput, bitSize, 10);
      rhsInput = atoi(packet.rhsInput, bitSize, 10);
      break;
    default:
      return;
  }

  /* Perform calculation */
  switch (packet.actType) {
    case 'add':
      result = add(lhsInput, rhsInput, bitSize, false);
      break;
    case 'subtract':
      result = subtract(lhsInput, rhsInput, bitSize, false);
      break;
    case 'mod-2':
      result = modulo_2(lhsInput, rhsInput, bitSize);
      break;
    default:
      return;
  }

  /* Convert to string and output */
  switch (packet.outType) {
    case 'Binary':
      output.innerHTML = itoa(result, bitSize, false, 2);
      break;
    case 'Octal':
      output.innerHTML = itoa(result, bitSize, false, 8);
      break;
    case 'Hexadecimal':
      output.innerHTML = itoa(result, bitSize, false, 16);
      break;
    case 'Decimal':
      output.innerHTML = itoa(result, bitSize, false, 10);
      break;
    default:
      return;
  }
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