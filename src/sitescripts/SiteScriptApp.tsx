import * as React from 'react';
import hub from "./hub/hub";
import "./hub/reactions";
import Workspace from './components/Workspace';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

export default class SiteScriptsApp extends React.PureComponent<SiteScriptAppProps, {}> {
    componentWillMount() {
        if (window.location.host.indexOf("netlify") > -1){
            (window as any).appInsights.trackPageView("SiteScripter");
        }
    }
    componentDidMount() {
        hub.on("update", () => this.forceUpdate());
    }
    render() {
        return (
            <Fabric>
                <Workspace {...hub.state} />
            </Fabric>
        );
    }
}

export interface SiteScriptAppProps {
    //props
}