import { createHub } from "hub-flow";
import defaultState, { SiteScriptAppState } from "./defaultState";
import { AppHub } from "../../entry";

export interface SiteScriptHub extends AppHub {
    state: SiteScriptAppState
}

export default createHub(defaultState, { cacheKey: "sptools-sitescriptmaker"}) as SiteScriptHub;