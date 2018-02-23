import ParseErrorCode from "./ParseErrorCode";
export default class ParseError extends Error {
    constructor(code?: ParseErrorCode, description?: string);
}
