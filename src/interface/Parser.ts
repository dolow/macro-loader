import Marker from "./Marker";

export default interface Parser {
  lineBreak: string;
  commentStyle: string;

  parse(source: string): Marker[];
}
