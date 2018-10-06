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

hub.on('actions:updateProperty', handleUpdateProperty);
hub.on("actions:add", handleAddAction);
hub.on("actions:remove", handleRemoveAction);
hub.on("actions:reorder", handleReorderAction);
hub.on("json:update", handleJSONUpdate);