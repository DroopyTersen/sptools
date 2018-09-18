import * as React from 'react';
import { SiteScriptAction } from '../../data/interfaces';
import { Draggable } from 'react-beautiful-dnd';
import ActionProperties from './ActionProperties';
import "./Action.scss";
import hub from '../../hub/hub';
import SubActions from './SubActions';
export default class Action extends React.PureComponent<ActionProps, {}> {
    onRemove = () => {
        hub.trigger("actions:remove", this.props.action.id);
    }
    renderSubactions = () => {
        let { action: { subactions } } = this.props;
        if (!subactions || !subactions.length) return null;
        console.log(subactions);
    }
    render() {
        let { action, index } = this.props;
        return (
            <Draggable key={action.id} draggableId={action.id} index={index}>
                {(provided, snapshot) => (
                    <div 
                        ref={provided.innerRef}
                        className={"action " + (snapshot.isDragging ? "dragging" : "")} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}>
                        <h3>{action.id}</h3>
                        <ActionProperties action={action} />
                        <SubActions action={action} />
                        <div className='remove-action' onClick={this.onRemove}>X</div>
                    </div>
                )}
            </Draggable>
        );
    }
}

export interface ActionProps {
    action: SiteScriptAction,
    index:number,
}