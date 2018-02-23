import Marker from "../interface/Marker";

export default class DefaultMarker implements Marker {
  public statement: string = "";
  public arguments: string[] = [];
  public index: number  = -1;
  public length: number = -1;

  constructor(content: string, index: number) {
    this.arguments = this.parse(content);
    if (this.arguments.length === 0) {
      return;
    }

    const statement = this.arguments.shift();
    if (statement === undefined) {
      return;
    }

    this.statement = statement;
    this.index     = index;
    this.length    = content.length;
  }

  public hasBlock(): boolean {
    return this.length >= 0;
  }

  /**
   * @params content would be like "ifdef MY_DEF"
   */
  public parse(content: string): string[] {
    let elements: string[] = [];

    // to array like ["ifdef", "MY_DEF"]
    elements = content.trim().split(" ").filter((element: string) => element.length > 0);
    if (elements.length === 0) {
      return elements;
    }

    // elements are definitions
    return elements;
  }
}
