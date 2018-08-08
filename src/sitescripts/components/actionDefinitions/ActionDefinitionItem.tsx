import * as React from 'react';
import { ActionDefinition } from '../../data/interfaces';
import { Draggable } from 'react-beautiful-dnd';

export default class ActionDefinitionItem extends React.PureComponent<ActionDefinitionItemProps, {}> {
    render() {
        let { action, index } = this.props;
        return (
            <Draggable key={action.verb} draggableId={action.verb} index={index}>
                {(provided, snapshot) => (
                    <div 
                        ref={provided.innerRef}
                        className={"action-definition " + (snapshot.isDragging ? "dragging" : "")} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}>
                        {action.title}
                    </div>
                )}
            </Draggable>
        );
    }
}

export interface ActionDefinitionItemProps {
    action: ActionDefinition,
    index: number
}