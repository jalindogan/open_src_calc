/* Struct interface of handler packet input */
import {HandlerPacket} from './lib/lib_h';

/* Handlers */
import tc from './lib/twos_complement';

export default function (event: Event): void {
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
      /* Build handler packet */
      let packet: HandlerPacket = {
        opType: (<HTMLInputElement>opType).value,
        inType: (<HTMLInputElement>inType).value,
        outType: (<HTMLInputElement>outType).value,
        bitSize: (<HTMLInputElement>bitSize).value,
        lhsInput: (<HTMLInputElement>lhsInput).value,
        rhsInput: (<HTMLInputElement>rhsInput).value,
        actType: (<Element>event.target).getAttribute('name') as string
      }

    switch (opType.innerHTML) {
      case "Two's complement":
        tc.handler(packet);
        break;
      default:
        break;
    }
  }
}