import * as React from 'react';
import { SiteScriptAction, ActionDefinition } from '../../../data/interfaces';
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";

import hub from "../../../hub/hub";
import Action from '../Action';
import SiteScriptActions from '../SiteScriptActions';
import "./SubActions.scss";
export default class SubActions extends React.PureComponent<SubActionsProps, {}> {
    onAddSubAction = (option) => {
        if (option && option.key) {
            let newAction = option.key;
            hub.trigger("subactions:add", this.props.action.id, newAction)
        }
    }
    getSubActionDefinitions = () => {
        if (!this.props.action) return null;
        let actionDefinition = hub.state.actionDefinitions.find(a => a.verb === this.props.action.verb);
        return (actionDefinition && actionDefinition.subactions && actionDefinition.subactions.length)
            ? actionDefinition.subactions
            : null;
    }
    getOptions = (subactions: ActionDefinition[]) => {
        return [
            { key: "", text: "Add..." },
            ...subactions.map(s => ({ key: s.verb, text: s.title }))
        ]
    }
    render() {
        let { action: { subactions } } = this.props;
        let subactionDefinitions = this.getSubActionDefinitions();
        if (!subactionDefinitions) return null;
         return (
            <div className='subactions'>
                <Dropdown 
                    label="Subactions"
                    onChanged={this.onAddSubAction}
                    selectedKey=""
                    options={this.getOptions(subactionDefinitions)}
                    className="subaction-picker"
                />
                <SiteScriptActions actions={subactions} parentActionId={this.props.action.id} />
            </div>
        );
    }
}
 export interface SubActionsProps {
    //props
    action: SiteScriptAction
} 