import ParseErrorCode from "./ParseErrorCode";

export default class ParseError extends Error {
  constructor(code?: ParseErrorCode, description?: string) {
    let message = "";
    if (code !== undefined && description !== undefined) {
      message += code + description;
    }
    super(message);
  }
}
