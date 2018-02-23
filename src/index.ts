import DefaultParser from "./parser/DefaultParser";
import { loader } from "webpack";

interface Option {
  parser?: string;
  lineBreak?: string;
  commentStyle?: string;
}
/*
function getParser(name: string): MacroLoader.Interface.Parser {
  const ParserClass = require(`./parser/${name}`);
  return new ParserClass();
}
*/
function load(this: loader.LoaderContext, source: string): string {
  const options: Option = this.query;
  // const parserName = options.parser || "DefaultParser";

  const parser = new DefaultParser();
  // const parser = getParser(parserName);
  parser.lineBreak = options.lineBreak || "\n";
  parser.commentStyle = options.commentStyle || "//#";

  const markers = parser.parse(source);
  if (markers.length > 0) {
    const marker = markers[0];
    let tmpSouce = source.substr(0, marker.index);
    const tail = marker.index + marker.length;
    tmpSouce += source.substr(tail, source.length - tail);
    source = tmpSouce;
  }

  return source;
}

export default load;
