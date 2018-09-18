import * as React from 'react';
import hub from "./hub/hub";
import "./hub/reactions";
import Workspace from './components/Workspace';

export default class SiteScriptsApp extends React.PureComponent<SiteScriptAppProps, {}> {
    componentDidMount() {
        hub.on("update", () => this.forceUpdate());
    }
    render() {
        return (
            <Workspace {...hub.state} />
        );
    }
}

export interface SiteScriptAppProps {
    //props
}