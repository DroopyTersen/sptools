import * as React from 'react';
import { IconButton, ActionButton } from 'office-ui-fabric-react/lib/Button';
import "./AppHeader.scss";

export default class AppHeader extends React.PureComponent<AppHeaderProps, {}> {
    render() {
        return (
            <div className='app-header'>
                <IconButton 
                    iconProps={{ iconName: "GlobalNavButton" }}
                    className='hamburger'
                />
                <h1 className='app-title'>Site Scripter</h1>
                <div className='app-actions'>
                    <ActionButton 
                        text="Download"
                        title="Download SiteScript.json"
                        iconProps={{ iconName: "Download"}}
                    />
                </div>
            </div>
        );
    }
}

export interface AppHeaderProps {
    //props
}