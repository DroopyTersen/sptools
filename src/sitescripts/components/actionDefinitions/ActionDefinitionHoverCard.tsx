import * as React from 'react';
import { ActionDefinition } from '../../data/interfaces';
import PropertiesTable from './PropertiesTable';
import "./ActionDefinitionHoverCard.scss";
export default class ActionDefinitionHoverCard extends React.PureComponent<ActionDefinitionHoverCardProps, {}> {
    render() {
        let action = this.props.action;
        return (
            <div className='hover-card'>
                <div className='title'>{action.title}</div>
                <div className='subtitle'>{action.verb}</div>
                <p className='description'>{action.description}</p>
                <div className='properties'>
                    <div className='title'>Properties</div>
                    <PropertiesTable action={action} />
                </div>
            </div>
        )
    }
}

export interface ActionDefinitionHoverCardProps {
    action: ActionDefinition
}