import * as React from 'react';
import "./TabbedNav.scss";

export default class TabbedNav extends React.PureComponent<TabbedNavProps, {}> {
    render() {
        return (
            <div className='tabbed-nav'>
                {this.props.children}
            </div>
        );
    }
} 

export interface TabbedNavProps {
}