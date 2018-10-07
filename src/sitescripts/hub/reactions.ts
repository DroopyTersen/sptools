import hub from "./hub";
import { 
        actionsToJson, 
        actionsFromJson, 
        createActionFromDefinition, 
        resetActionIds 
    } from "../data/actionUtils";

const handleAddAction = function(actionVerb, index) {
    let actionDefinition = hub.state.actionDefinitions.find(a => a.verb === actionVerb);
    if (actionDefinition) {
        let actions = resetActionIds([
            ...hub.state.actions.slice(0, index),
            createActionFromDefinition(actionDefinition),
            ...hub.state.actions.slice(index)
        ])
        hub.state.set( { actions, json: actionsToJson(actions) });
        hub.cacheState();
    }
}

const handleRemoveSubAction = function(actionId, subActionId) {
    console.log("remove sub", actionId, subActionId);
    try {
        let targetAction = hub.state.actions.find(a => a.id === actionId);
        let subactions = targetAction.subactions.filter(sa => sa.id !== subActionId);
        subactions = resetActionIds(subactions);
        targetAction.set({ subactions });
        hub.state.set({
            json: actionsToJson(hub.state.actions)
        })
        hub.cacheState();
    } catch (err) {
        console.log("Unable to remove Sub Action", err);
    }
}
const handleAddSubAction = function(actionId, subActionVerb) {
    try {
        let action = hub.state.actions.find(a => a.id === actionId);
        let actionDefinition = hub.state.actionDefinitions.find(a => a.verb === action.verb);
        let subActionDefinition = actionDefinition.subactions.find(sa => sa.verb === subActionVerb);
        let newSubAction = createActionFromDefinition(subActionDefinition);
        let subactions = resetActionIds([
            ...action.subactions,
            newSubAction
        ])
        action.set({ subactions });
        hub.state.set({
            json: actionsToJson(hub.state.actions)
        })
        hub.cacheState();
     } catch (err) {
        console.log("Unable to add Sub Action", err);
    }
}

const handleReorderSubAction = function(actionId, subActionId, newIndex) {
    try {
        let parentAction = hub.state.actions.find(a => a.id === actionId);
        let targetSubaction = parentAction.subactions.find(sa => sa.id === subActionId);
        if (targetSubaction) {
            let subactions = parentAction.subactions.filter(sa => sa.id !== subActionId);
            subactions.splice(newIndex, 0, targetSubaction);
            subactions = resetActionIds(subactions);
            parentAction.set({ subactions }).now();
            hub.state.set({
                json: actionsToJson(hub.state.actions)
            }).now();
            hub.cacheState();
        }
    } catch (err) {
        console.log("Unable to reorder subactions");
    }
}
const handleReorderAction = function(actionId, newIndex) {
    let target = hub.state.actions.find(a => a.id === actionId);
    if (target) {
        let actions = hub.state.actions.filter(a => a.id !== actionId);
        actions.splice(newIndex, 0, target);
        actions = resetActionIds(actions);
        hub.state.set( { actions, json: actionsToJson(actions) }).now();
        hub.cacheState();
    }
}

const handleRemoveAction = function(actionId) {
    let actions = hub.state.actions.filter(a => a.id !== actionId);
    actions = resetActionIds(actions);
    hub.state.set( { actions, json: actionsToJson(actions) }).now();
    hub.cacheState();
}

const handleJSONUpdate = function(json) {
    //TODO: Validate
    if (json) {
        hub.state.set({ json }).now();
        let actions = actionsFromJson(json);
        if (actions) {
            hub.state.set({ actions });
            hub.cacheState();
        }
    }
} 

const handleUpdateSubActionProperty = function(actionId, subactionId, propertyId, value) {
    try {
        let parentAction = hub.state.actions.find(a => a.id === actionId);
        let targetSubaction = parentAction.subactions.find(sa => sa.id === subactionId);
        if (targetSubaction) {
            let targetProperty = targetSubaction.properties.find(p => p.id === propertyId);
            if (targetProperty) {
                targetProperty.set({ value }).now();
                hub.state.set({ json: actionsToJson(hub.state.actions) });
                hub.cacheState();
            }
        }
    } catch(err) {
        console.log("Unable to update Sub Action property");
    }
}
const handleUpdateProperty = function(actionId, propertyId, value) {
    let targetAction = hub.state.actions.find(a => a.id === actionId);
    if (targetAction) {
        let targetProperty = targetAction.properties.find(p => p.id === propertyId);
        if (targetProperty) {
            targetProperty.set({ value }).now();
            hub.state.set({ json: actionsToJson(hub.state.actions) });
            hub.cacheState();
        }
    }
}
const handleScriptRename = function(newName) {
    hub.state.set({ scriptName: newName });
    hub.cacheState();
}

const handleScriptDownload = function() {
    let text = actionsToJson(hub.state.actions);
    let filename = `${hub.state.scriptName || "SiteScript"}.json`
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

hub.on("script:download", handleScriptDownload);
hub.on("script:rename", handleScriptRename);
hub.on('actions:updateProperty', handleUpdateProperty);
hub.on("actions:add", handleAddAction);
hub.on("actions:remove", handleRemoveAction);
hub.on("actions:reorder", handleReorderAction);
hub.on("json:update", handleJSONUpdate);
hub.on("subactions:add", handleAddSubAction);
hub.on("subactions:remove", handleRemoveSubAction);
hub.on("subactions:reorder", handleReorderSubAction);
hub.on("subactions:updateProperty", handleUpdateSubActionProperty);