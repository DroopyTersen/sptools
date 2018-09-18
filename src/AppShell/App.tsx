import * as React from 'react';
import { Router, Location, Link } from "@reach/router";

import SiteScriptApp from "../sitescripts/SiteScriptApp";
import ThemeBuilderApp from "../ThemeBuilder/ThemeBuilderApp";
import NavMenu from './NavMenu';
export default class App extends React.Component {
    render() {
        return (
    
                <Location>{({location}) => (
                    <div className="app">
                       <NavMenu 
                            currentPath={location.pathname}
                            links={[
                            { text: "Site Script GUI", path: "/sitescripts" },
                            { text: "Theme Builder", path: "themes" }
                        ]} />
                            
                        <div className='content'>
                            <Router>
                                <SiteScriptApp path="/sitescripts" default />
                                <ThemeBuilderApp path="/themes" />
                            </Router>
                        </div>
                    </div>

                )}
                </Location>
        );
    }
}