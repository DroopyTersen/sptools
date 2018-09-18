import * as React from 'react';
import hub from "./hub/hub";
import "./hub/reactions";

export default class SiteScriptsApp extends React.PureComponent<SiteScriptAppProps, {}> {
    componentDidMount() {
        hub.on("update", () => this.forceUpdate());
    }
    render() {
        return (
            <div>
                Theme Builder
            </div>
        );
    }
}

export interface SiteScriptAppProps {
    //props
}