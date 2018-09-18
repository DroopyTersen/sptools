import { createHub } from "hub-flow";
import defaultState, { ThemesAppState } from "./defaultState";
import { AppHub } from "../../entry";

export interface ThemesHub extends AppHub {
    state: ThemesAppState
}

export default createHub(defaultState, { cacheKey: "sptools-themebuilder"}) as ThemesHub;