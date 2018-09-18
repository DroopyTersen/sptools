import * as React from 'react';
import { SiteScriptAction } from '../../data/interfaces';
import hub from "../../hub/hub";
import Action from './Action';
export default class SubActions extends React.PureComponent<SubActionsProps, {}> {
    onAddSubAction = (e) => {
        let newAction = e.currentTarget.value;
        hub.trigger("subactions:add", this.props.action.id, newAction)
        e.currentTarget.value = "";
    }
    getSubActionDefinitions = () => {
        let actionDefinition = hub.state.actionDefinitions.find(a => a.verb === this.props.action.verb);
        return (actionDefinition && actionDefinition.subactions && actionDefinition.subactions.length)
            ? actionDefinition.subactions
            : null;
    }
    render() {
        let { action: { subactions } } = this.props;
        let subactionDefinitions = this.getSubActionDefinitions();
        if (!subactionDefinitions) return null;

        return (
            <div>
                <h3>Sub Actions</h3>
                <select onChange={this.onAddSubAction}>
                    <option value="">Add...</option>
                    {subactionDefinitions.map(action => (
                        <option value={action.verb}>{action.title}</option>
                    ))}
                </select>
                <div>
                    {this.props.action.subactions.map((subaction, index)=> (
                        <Action action={subaction} index={index} />
                    ))}
                </div>
            </div>
        );
    }
}

export interface SubActionsProps {
    //props
    action: SiteScriptAction
}