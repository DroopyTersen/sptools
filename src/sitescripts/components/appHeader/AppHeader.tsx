import * as React from 'react';
import { IconButton, ActionButton } from 'office-ui-fabric-react/lib/Button';
import "./AppHeader.scss";
import hub from "../../hub/hub";

export default class AppHeader extends React.PureComponent<AppHeaderProps, {}> {
    onSave = () => {
        alert("Save Functionality Coming Soon!")
    }
    onDownload = () => {
        hub.trigger("script:download");
    }
    onMenuClick = () => {
        alert("Menu coming soon!")
    }
    render() {
        return (
            <div className='app-header'>
                <IconButton 
                    iconProps={{ iconName: "GlobalNavButton" }}
                    className='hamburger'
                    onClick={this.onMenuClick}
                />
                <h1 className='app-title'>Site Scripter</h1>
                <div className='app-actions'>
                    <ActionButton 
                        text="Save"
                        title={`Save "${this.props.scriptName}"`}
                        disabled={!this.props.scriptName}
                        iconProps={{ iconName: "Save"}}
                        onClick={this.onSave}
                    />
                    <ActionButton 
                        text="Download"
                        title={`Download "${this.props.scriptName}.json"`}
                        disabled={!this.props.scriptName}
                        iconProps={{ iconName: "Download"}}
                        onClick={this.onDownload}
                    />
                </div>
            </div>
        );
    }
}

export interface AppHeaderProps {
    //props
    scriptName: string
}

