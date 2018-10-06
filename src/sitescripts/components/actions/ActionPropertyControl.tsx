import * as React from 'react';
import { ActionProperty, SiteScriptAction } from '../../data/interfaces';
import hub from '../../hub/hub';
import "./ActionPropertyControl.scss";
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";


export default class ActionPropertyControl extends React.PureComponent<ActionPropertyControlProps, {}> {
    onChange = (e) => {
        let target = e.currentTarget || e.target || e.key;
        let value = target.value;
        if (this.props.property.type === "boolean") value = !target.checked;
        hub.trigger("actions:updateProperty", this.props.parentActionId, this.props.property.id, value || "");
    }
    onToggleChanged = (newValue) => {
        console.log(newValue);
        hub.trigger("actions:updateProperty", this.props.parentActionId, this.props.property.id, newValue);
    }
    onDropdownChanged = (option) => {
        hub.trigger("actions:updateProperty", this.props.parentActionId, this.props.property.id, option.key);
    }
    renderInput = () => {
        let property = this.props.property;
        if (property.type === "choice") {
            let options = property.choices.map(c => ({ key: c, text: c}));
            return(
                <Dropdown 
                    onChanged={this.onDropdownChanged}
                    label={property.title}
                    options={options}
                    selectedKey={property.value}
                />
            )
        } else if (property.type === "boolean") {
            // return <input type="checkbox" checked={property.value} onChange={this.onChange} />
            return (
                <Toggle 
                    checked={property.value}
                    onText="Yes"
                    offText="No"
                    label={property.title}
                    className="toggle"
                    onChanged={this.onToggleChanged}
                />
            )
        } else if (property.type === "object") {
            let value = property.value;
            try {
                if (typeof value === "object") {
                    value = JSON.stringify(value, null, "  ")
                }
            } catch(err) {
                //couldn't
            }
            return (
                <TextField 
                    label={property.title} 
                    value={value} 
                    onChange={this.onChange}
                    multiline={true}
                    rows={6}
                    autoAdjustHeight={true} 
                />
            )
        }
        else {
            let isMultiline = (property.value && property.value.length > 60)
            return (
                <TextField 
                    label={property.title} 
                    value={property.value} 
                    onChange={this.onChange}
                    multiline={isMultiline}
                    rows={6}
                    autoAdjustHeight={isMultiline} 
                />
            );

        }
    }
    render() {
        let property = this.props.property;
        return (
            <div className='property-control'>
                {this.renderInput()}
                <div className='description'>{property.type.toUpperCase()} - {property.description}</div>
            </div>
        );
    }
}

export interface ActionPropertyControlProps {
    property: ActionProperty,
    parentActionId: string,
}