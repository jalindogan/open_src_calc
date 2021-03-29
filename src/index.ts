/**
 * Top level implementation and integration
 */

import tc from './lib/twos_complement';

tc.add(1, 1, 1, false);

tc.subtract(1, 1, 1, false);

const actionHandler = (event: Event): void => {
  event.preventDefault();

  /* Operation Type */
  let opType = document.getElementById('op-type');

  /* Input Type */
  let inType = document.getElementById('input-type');

  /* Output Type */
  let outType = document.getElementById('output-type');

  /* Bit Size */
  let bitSize = document.getElementById('bit-size');

  /* Calculation inputs */
  let lhsInput = document.getElementById('lhs-input');
  let rhsInput = document.getElementById('rhs-input');

  if (event && opType && inType && outType && bitSize && lhsInput && rhsInput) {
    /* All variables are not null */
    let actionType = (<Element>event.target).getAttribute('name');
    switch (opType.innerHTML) {
      case "Two's complement":
        break;
      default:
        break;
    }
  }
}

/* Add handler to calculator action buttons */
document.getElementById('add-btn')?.addEventListener("click", actionHandler);
document.getElementById('subtract-btn')?.addEventListener("click", actionHandler);
document.getElementById('mod-2-btn')?.addEventListener("click", actionHandler);