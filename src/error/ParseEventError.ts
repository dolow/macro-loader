import ParseEventErrorCode from "./ParseEventErrorCode";

export default class ParseEventError extends Error {
  constructor(code: ParseEventErrorCode, description?: string) {
    let message = "";

    switch (code) {
      case ParseEventErrorCode.MULTIPLE_DEFINE:   message = "can not contain multiple variables"; break;
      case ParseEventErrorCode.DUPLICATE_DEFINE:  message = "duplicate definition"; break;
      case ParseEventErrorCode.REQUIRE_CONDITION: message = "requires condition"; break;
      case ParseEventErrorCode.TOO_MANY_ARGS:     message = "too many arguments"; break;
      case ParseEventErrorCode.UNEXPECTED_SYNTAX: message = "unexpected macro"; break;
      default:                message = "unknown error"; break;
    }

    if (description !== undefined) {
      message += ` (${description})`;
    }

    super(message);
  }
}
