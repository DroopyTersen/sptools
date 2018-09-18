import { FreezerObject } from "../../entry";
import defaultTheme from "../data/defaultTheme";
export interface ThemesAppState extends FreezerObject {
    json: string
}

let defaultState: ThemesAppState = {
    json: defaultTheme
}
export default defaultState;