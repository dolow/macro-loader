import Parser from "../interface/Parser";
import Marker from "../interface/Marker";
import DefaultMarker from "../marker/DefaultMarker";
import ParseError from "../error/ParseError";

export default class DefaultParser implements Parser {
  public lineBreak: string = "\n";
  public commentStyle: string = "//#";

  public parse(source: string): Marker[] {
    const markers: DefaultMarker[] = [];
    const markerStack: DefaultMarker[] = [];

    let macroIndex = source.indexOf(this.commentStyle);

    while (macroIndex !== -1) {
      let macroTail = source.indexOf(this.lineBreak, macroIndex);
      if (macroTail === -1) {
        // EOF
        macroTail = source.length;
      }

      const macroBeginIndex = macroIndex + this.commentStyle.length;
      const macroLength = macroTail - macroIndex - this.commentStyle.length;

      const macroContent = source.substr(macroBeginIndex, macroLength);
      const marker = new DefaultMarker(macroContent, macroIndex);

      // line like "//#\n"
      if (marker.statement === undefined) {
        continue;
      }

      // TODO: export rules
      switch (marker.statement) {
        case "ifdef":
        case "ifndef": {
          markers.push(marker);
          markerStack.push(marker);
          break;
        }
        case "endif": {
          if (markerStack.length === 0) {
            throw new ParseError();
          } else {
            const currentMarker = markerStack.pop();
            if (currentMarker === undefined) {
              throw new ParseError();
            } else {
              currentMarker.length = macroTail - currentMarker.index;
            }
          }
          break;
        }
        case "define": markers.push(marker); break;
        default: break;
      }

      macroIndex = source.indexOf(this.commentStyle, macroIndex + 1);
      if (macroIndex >= source.length) {
        // EOF
        break;
      }
    }

    if (markerStack.length > 0) {
      throw new ParseError();
    }

    return markers;
  }
}
