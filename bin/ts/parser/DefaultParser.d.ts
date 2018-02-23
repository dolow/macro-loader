import Parser from "../interface/Parser";
import Marker from "../interface/Marker";
export default class DefaultParser implements Parser {
    lineBreak: string;
    commentStyle: string;
    parse(source: string): Marker[];
}
