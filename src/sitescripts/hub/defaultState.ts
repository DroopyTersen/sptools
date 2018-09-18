import { ActionDefinition, SiteScriptAction } from "../data/interfaces";
import actionDefinitions from "../data/schemaParser";
import { actionsFromJson } from "../data/actionUtils";
import actionsJson from "./actionsJson";
import { FreezerObject } from "../../entry";

export interface SiteScriptAppState extends FreezerObject {
    actionDefinitions: ActionDefinition[],
    actions: SiteScriptAction[],
    json: string
}

let defaultState: SiteScriptAppState = {
    actionDefinitions: actionDefinitions,
    actions: actionsFromJson(actionsJson),
    json: actionsJson
}
export default defaultState;