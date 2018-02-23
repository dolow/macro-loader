/// <reference types="webpack" />
import { loader } from "webpack";
declare function load(this: loader.LoaderContext, source: string): string;
export default load;
