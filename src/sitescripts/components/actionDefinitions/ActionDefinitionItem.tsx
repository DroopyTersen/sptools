import * as React from 'react';
import { ActionDefinition } from '../../data/interfaces';
import { Draggable } from 'react-beautiful-dnd';
import PropertiesTable from './PropertiesTable';
import ActionDefinitionHoverCard from './ActionDefinitionHoverCard';
require("./ActionDefinitionItem.scss");
export default class ActionDefinitionItem extends React.PureComponent<ActionDefinitionItemProps, {}> {
    state = {
        isHovering: false
    }
    openHoverPanel = () => this.setState({ isHovering: true })
    closeHoverHoverPanel = () => this.setState({ isHovering: false })

    renderExandedHoverCard = () => {
        return 
    }
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
                        <div className='title' onMouseOver={this.openHoverPanel} onMouseLeave={this.closeHoverHoverPanel}>
                            {action.title}
                            { action.verb === "associateExtension" && <ActionDefinitionHoverCard action={action} />}
                        </div>
                        <div className='subtitle'>{action.verb}</div>
                        {/* <p className='description'>{action.description}</p> */}
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