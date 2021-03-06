import * as React from 'react';
import { ActionDefinition } from '../../data/interfaces';
import { Droppable, DroppableStateSnapshot, Draggable } from 'react-beautiful-dnd';
import ActionDefinitionItem from './ActionDefinitionItem';
import { TextField } from "office-ui-fabric-react/lib/TextField";
import "./ActionDefinitions.scss";
const getColumnClassNames = (snapshot:DroppableStateSnapshot) => {
    return [
        "action-definitions-column",
        "column",
        snapshot.isDraggingOver ? "dragging" : ""
    ].filter(c => c).join(" ");
}
export default class ActionDefinitions extends React.PureComponent<ActionDefinitionsProps, {}> {
    state = {
        filter: "",
    }
    onFilterChange = (e) => {
        this.setState({ filter: e.target.value || "" })
    }
    render() {
        return (
            <div className='action-definitions'>
                <div className='section-title'>Available Actions</div>
                <div className='filter'>
                    <TextField value={this.state.filter} onChange={this.onFilterChange} placeholder="Filter..." />
                </div>
                <Droppable droppableId="action-definitions" isDropDisabled={true}>
                    {(provided, snapshot) => {
                        return (
                            <div className={getColumnClassNames(snapshot)} ref={provided.innerRef}>
                                {this.props.actionDefinitions
                                    .filter(action => {
                                        return action.title.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1
                                    })
                                    .map((action, index) => (
                                        <ActionDefinitionItem key={action.verb} action={action} index={index} />
                                    ))
                                }
                            </div>
                        )
                    }}
                </Droppable>
            </div>
        );
    }
}

export interface ActionDefinitionsProps {
    //props
    actionDefinitions:ActionDefinition[]
}