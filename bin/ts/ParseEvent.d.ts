export default class ParseEvent {
    static definedMacros: {
        [key: string]: string;
    };
    static eventStacks: string[];
    static define(args: string[]): boolean;
    static ifdef(args: string[]): boolean;
    static ifndef(args: string[]): boolean;
    static endif(args: string[]): boolean;
}
