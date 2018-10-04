import * as React from 'react';
import "./Collapsible.scss";

export default class Collapsible extends React.PureComponent<CollapsibleProps, CollapsibleState> {
    static defaultProps = {
        startCollapsed: true
    }
    state = {
        isCollapsed: this.props.startCollapsed
    }
    // Its controlled if an isCollapsed prop is sent in w/ an onToggle handler
    checkIsControlled = () => {
        return (this.props.isCollapsed !== undefined || this.props.isCollapsed !== null) 
            && this.props.onToggle
    }
    getCollapsedValue = () => this.checkIsControlled() ? this.props.isCollapsed : this.state.isCollapsed;
    onToggle = () => {
        if (this.checkIsControlled()) {
            this.props.onToggle(this.props.title);
        } else {
            this.setState({ isCollapsed: !this.state.isCollapsed})
        }
    }
    render() {
        let containerClass = [
            "collapsible",
            this.getCollapsedValue() ? "collapsed" : ""
        ].filter(c => c).join(" ");

        let sectionClass = [
            "sectionTitle",
            "ms-fontColor-blue"
        ].filter(c => c).join(" ");

        let collapsedContentClass = [
            this.getCollapsedValue()  ? "collapsed" : ""
        ].filter(c => c).join(" ");

        var iconClass = "ms-Icon ms-Icon--" + (this.getCollapsedValue() ? "ChevronRight" : "ChevronDown")
        return (
            <div className={containerClass}>
                <h2 
                    title='Click to Expand/Collapse' 
                    className={sectionClass} 
                    onClick={this.onToggle}>
                    {this.props.title}
                    <i className={iconClass} aria-hidden="true"></i>
                </h2>
                <div className={collapsedContentClass}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export interface CollapsibleProps {
    title: string,
    isCollapsed?: boolean,
    startCollapsed?: boolean,
    onToggle?: (title) => void,
}

export interface CollapsibleState {
    isCollapsed: boolean
}