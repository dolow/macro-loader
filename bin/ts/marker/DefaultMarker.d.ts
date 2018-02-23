import Marker from "../interface/Marker";
export default class DefaultMarker implements Marker {
    statement: string;
    arguments: string[];
    index: number;
    length: number;
    constructor(content: string, index: number);
    hasBlock(): boolean;
    /**
     * @params content would be like "ifdef MY_DEF"
     */
    parse(content: string): string[];
}
