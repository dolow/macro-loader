import ParseEventError from "./error/ParseEventError";
import ParseEventErrorCode from "./error/ParseEventErrorCode";

export default class ParseEvent {
  public static definedMacros: { [key: string]: string } = {};
  public static eventStacks: string[] = [];

  public static define(args: string[]): boolean {
    if (args.length > 1) {
      throw new ParseEventError(ParseEventErrorCode.MULTIPLE_DEFINE, args.join(" "));
    }

    const variable = args[0];
    if (ParseEvent.definedMacros[variable]) {
      throw new ParseEventError(ParseEventErrorCode.DUPLICATE_DEFINE, variable);
    }

    ParseEvent.definedMacros[variable] = (args.length === 2) ? args[1] : "1";

    return true;
  }
  public static ifdef(args: string[]): boolean {
    if (args.length === 0) {
      throw new ParseEventError(ParseEventErrorCode.REQUIRE_CONDITION);
    }

    ParseEvent.eventStacks.push("ifdef");

    return true;
  }
  public static ifndef(args: string[]): boolean {
    if (args.length === 0) {
      throw new ParseEventError(ParseEventErrorCode.REQUIRE_CONDITION);
    }

    ParseEvent.eventStacks.push("ifndef");

    return true;
  }
  public static endif(args: string[]): boolean {
    if (args.length !== 0) {
      throw new ParseEventError(ParseEventErrorCode.TOO_MANY_ARGS);
    }
    if (ParseEvent.eventStacks.length === 0) {
      throw new ParseEventError(ParseEventErrorCode.UNEXPECTED_SYNTAX);
    }

    const lastEvent = ParseEvent.eventStacks.pop();
    if (lastEvent !== "ifdef" && lastEvent !== "ifndef") {
      throw new ParseEventError(ParseEventErrorCode.UNEXPECTED_SYNTAX, lastEvent);
    }

    return true;
  }
}
