import * as React from 'react';
import { SiteScriptAction } from '../../data/interfaces';
import { DroppableStateSnapshot, Droppable } from 'react-beautiful-dnd';
import Action from './Action';
import "./SiteScriptActions.scss";
const getClassNames = (snapshot:DroppableStateSnapshot) => {
    return [
        "actions",
        "column",
        snapshot.isDraggingOver ? "dragging" : ""
    ].filter(c => c).join(" ");
}
export default class SiteScriptActions extends React.PureComponent<SiteScriptActionsProps, {}> {
    render() {
        let droppableId = "actions";
        if (this.props.parentActionId) droppableId = "subactions-" + this.props.parentActionId;
    
        return (
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => {
                    return (
                        <div className={getClassNames(snapshot)} ref={provided.innerRef}>
                            {this.props.actions.map((action, index) => (
                                <Action key={action.id} action={action} index={index} parentActionId={this.props.parentActionId} />
                            ))}
                        </div>
                    )
                }}
            </Droppable>
        );
    }
}

export interface SiteScriptActionsProps {
    actions:SiteScriptAction[];
    parentActionId?: string;
}