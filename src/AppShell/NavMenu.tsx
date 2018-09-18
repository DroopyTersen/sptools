import * as React from 'react';
import "hamburgers/_sass/hamburgers/hamburgers.scss";
import { Link } from "@reach/router";
import "./NavMenu.scss";
export default class NavMenu extends React.PureComponent<NavMenuProps, {}> {
    state = {
        isOpen: false
    }
    onToggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    getPageTitle = () => {
        let match = this.props.links.find(l => l.path === this.props.currentPath);
        return match ? match.text : "";
    }
    render() {
        let buttonClasses = [
            "hamburger",
            "hamburger--collapse",
            this.state.isOpen ? "is-active" : ""
        ].filter(c => c).join(" ");
        let menuClasses = [
            "nav-menu",
            this.state.isOpen ? "is-active" : ""
        ].filter(c => c).join(" ")
        return (
            <div>
                <div className='header'>
                    <button className={buttonClasses} type="button" onClick={this.onToggle}>
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                    <h1 className='page-title'>{this.getPageTitle()}</h1>
                </div>

                <div className={menuClasses}>
                    <h1 className='title'>SPTools by portalsdev</h1>
                    {this.props.links.map(link => (
                        <Link to={link.path}><div className='link' onClick={this.onToggle}>{link.text}</div></Link>
                    ))}
                </div>
            </div>
        );
    }
}

export interface NavMenuProps {
    links: [{ path: string, text: string }],
    currentPath: string
}