import { ActionDefinition, SiteScriptAction, JsonSchema } from "./interfaces";
import { validateActions } from "./validation";
import actionDefinitions from "./schemaParser";


export function resetActionIds(actions:SiteScriptAction[]) : SiteScriptAction[] {
    return actions.map((a,i) => ({ ...a, ...{ id: `${i + 1}) ${a.verb}`}}));
}

export function createActionFromDefinition (actionDefinition:ActionDefinition) {
    let newAction = JSON.parse(JSON.stringify(actionDefinition)) as SiteScriptAction
    _setDefaultRequiredPropertyValues(newAction);
    if (newAction.subactions) newAction.subactions = [];
    return newAction;
}

function _setDefaultRequiredPropertyValues(action:SiteScriptAction) {
    action.properties.forEach(property => {
        if (property.isRequired) {
            if (property.type === "boolean") property.value = false;
            else if (property.type === "number") property.value = 666;
            else property.value = "REQUIRED!"
        }
    })
}
export function actionsFromJson(input: string|JsonSchema) : SiteScriptAction[] {
    try {
        if (!validateJSON(input)) return null;
        if (typeof input === "string") {
            input = JSON.parse(input) as JsonSchema;
        }
        if (!input.actions || !input.$schema) return null;
        return resetActionIds(input.actions.map(_actionFromJson));
    } catch(err) {
        console.log("actionsFromJson", err);
        throw new Error("Unable to parse SiteScript JSON")
    }
}

// WARNING: Not immutable! 
function _copyProperties(rawAction:any, action:SiteScriptAction) {
    Object.keys(rawAction).forEach(key => {
        let targetProperty = action.properties.find(p => p.id === key);
        if (targetProperty) {
            targetProperty.value = rawAction[key]
        }
    })
}
function _actionFromJson(rawAction:any) : SiteScriptAction {
    let definition = actionDefinitions.find(a => a.verb === rawAction.verb);
    if (!definition) return null;
    
    var action = createActionFromDefinition(definition);
    _copyProperties(rawAction, action);
    if (rawAction.subactions) {
        rawAction.subactions.forEach(rawSubaction => {
            let targetSubAction = action.subactions.find(a => a.verb === rawSubaction.verb);
            if (targetSubAction) {
                _copyProperties(rawSubaction, targetSubAction);
            }
        })
    }
    return action;
}

export const validateJSON = function(jsonString) {
    try {
        JSON.parse(jsonString);
        return true;
    } catch(err) {
        return false
    }
}

export const actionsToJson = function(actions:SiteScriptAction[]) : string {
    let validation = validateActions(actions);
    if (!validation.isValid) {
        console.log("Invalid Actions", validation.messages);
        throw new Error("The Actions are not valid: " + validation.messages.join(", "));
    }
    let json = {
        "$schema": "schema.json",
        "actions": actions.map(_actionToJson).filter(a => a)
    }
    return JSON.stringify(json, null, "\t");
}

const _actionToJson = function(action:SiteScriptAction) : any {
    let jsonAction : any = action.properties.reduce((obj, property) => {
        if (property.value !== undefined) {
            obj[property.id] = property.value;
            if (property.type === "boolean") {
                console.log("bool", property.value);
                obj[property.id] = property.value ? true : false
            }
            else if (property.type === "number") {
                try {
                    obj[property.id] = parseInt(property.value, 10);
                } catch (err) {}
            }
            else if (property.type === "object") {
                try {
                    console.log(property.value)
                    obj[property.id] = JSON.parse(property.value);
                } catch(err) {
                    obj[property.id] = { "ERROR": "Invalid JSON object" }
                }
            } 
        } 
        return obj;
    }, { verb: action.verb })

    if (action.subactions) {
        jsonAction.subactions = action.subactions.map(_actionToJson).filter(a => a);
    }
    return Object.keys(jsonAction).length > 1 ? jsonAction : null;
}

