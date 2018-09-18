import * as React from 'react';
import { Link } from "@reach/router";

export default class Tab extends React.PureComponent<TabProps, {}> {
    isActiveTab = () => {
        let path = this.props.path.toLowerCase();
        let activePath = (this.props.activePath || "").toLowerCase();
        return (path !== "/")
            ? activePath.startsWith(path) 
            : activePath === "/";
    }
    render() {
        let { path, activePath, icon } = this.props;
        let className = [
                    "tab", 
                    this.isActiveTab() ? "selected" : ""
                ].filter(c => c).join(" ");
        return (
            <Link to={path}>
                <div className={className}>
                    <i className={icon}></i>
                </div>
            </Link>
        );
    }
}

export interface TabProps {
    path: string,
    activePath?: string,
    icon: string
}