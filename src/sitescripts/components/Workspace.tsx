import * as React from 'react';
import { DragDropContext, DropResult, DragUpdate, HookProvided, DragStart } from 'react-beautiful-dnd';
import { ActionDefinition, SiteScriptAction } from '../data/interfaces';
import ActionDefinitions from './actionDefinitions/ActionDefinitions';
import SiteScriptActions from './actions/SiteScriptActions';
import hub from '../hub/hub';
import AdvancedEditor from './code/AdvancedEditor';
require("./Workspace.scss");
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import AppHeader from './appHeader/AppHeader';

export default class Workspace extends React.PureComponent<WorkspaceProps, {}> {
    onDragStart = (dragStart:DragStart) => {
        console.log("START", dragStart);
    }
    onDragUpdate = (dragUpdate: DragUpdate) => {
        console.log("Update", dragUpdate)
    }
    onDragEnd = (result:DropResult) => {
        console.log("DROP", result)
        if (!result.destination) return;

        // Add new action
        if (result.source.droppableId === "action-definitions" && result.destination.droppableId === "actions" ) {
            hub.trigger("actions:add", result.draggableId, result.destination.index);
        }
        // Reorder
        else if (result.source.droppableId === "actions" && result.destination.droppableId === "actions") {
            hub.trigger("actions:reorder", result.draggableId, result.destination.index);
        }
        // sub action reorder
        else if (result.source.droppableId.indexOf("subactions-") === 0 ) {
            let parentActionId = result.source.droppableId.replace("subactions-", "");
            let subActionId = result.draggableId;
            hub.trigger("subactions:reorder", parentActionId, subActionId, result.destination.index);
        }
    }
    render() {
        return (
            <div className='app'>
                <AppHeader />
                <DragDropContext 
                    onDragStart={this.onDragStart}
                    onDragUpdate={this.onDragUpdate}
                    onDragEnd={this.onDragEnd}>
                    <div className='workspace'>
                        <ActionDefinitions actionDefinitions={this.props.actionDefinitions} />
                        <div className='sitescript-section'>
                            {/* <div className='section-title'>Site Script</div> */}
                            <SiteScriptActions actions={this.props.actions} />
                            <AdvancedEditor json={this.props.json} />
                        </div>
                        {/* <RemoveZone /> */}
                    </div>
                </DragDropContext>
            
            </div>
        );
    } 
}

export interface WorkspaceProps {
    actionDefinitions: ActionDefinition[],
    actions:SiteScriptAction[],
    json: string,
}