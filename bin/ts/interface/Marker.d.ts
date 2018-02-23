export default interface Marker {
    statement: string;
    arguments: string[];
    index: number;
    length: number;
    hasBlock(): boolean;
    parse(content: string): string[];
}
