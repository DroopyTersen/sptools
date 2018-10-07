import * as React from 'react';
import { SiteScriptAction } from '../../data/interfaces';
import { Draggable } from 'react-beautiful-dnd';
import ActionProperties from './ActionProperties';
import "./Action.scss";
import hub from '../../hub/hub';
import Collapsible from '../../../components/Collapsible/Collapsible';
import { IconButton } from "office-ui-fabric-react/lib/Button";
import SubActions from './SubActions/SubActions';
export default class Action extends React.PureComponent<ActionProps, {}> {

    onRemove = () => {
        console.log("REMOVE", this.props);
        if (this.props.parentActionId) {
            hub.trigger("subactions:remove", this.props.parentActionId, this.props.action.id);
        } else {
            hub.trigger("actions:remove", this.props.action.id, );
        }
    }
    renderAction = (action:SiteScriptAction) => {
        return (
            <Collapsible title={action.id} startCollapsed={true}>
                <ActionProperties action ={action} />
                <SubActions action={action} />
                <IconButton 
                    iconProps={{ className: "ms-Icon ms-Icon--Delete" }}
                    className="remove-action"
                    onClick={this.onRemove}
                />
            </Collapsible>
        );
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
                        <div className="gripper"><i className="ms-Icon ms-Icon--GripperBarVertical"></i></div>
                        {this.renderAction(action)}
                    </div>
                )}
            </Draggable>
        );
    }
}

export interface ActionProps {
    action: SiteScriptAction,
    index:number,
    parentActionId?: string,
}