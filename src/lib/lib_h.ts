/**
 * All value shall be string when input, conversion and type check should be
 * carried out after the opType has been sorted.
 */
export interface HandlerPacket {
    opType: string,
    inType: string,
    outType: string,
    bitSize: string,
    lhsInput: string,
    rhsInput: string,
    actType: string
}