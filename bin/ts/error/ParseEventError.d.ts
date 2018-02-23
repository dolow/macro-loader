import ParseEventErrorCode from "./ParseEventErrorCode";
export default class ParseEventError extends Error {
    constructor(code: ParseEventErrorCode, description?: string);
}
