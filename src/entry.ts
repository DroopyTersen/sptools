import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./AppShell/App";
import SiteScriptApp from "./sitescripts/SiteScriptApp";

export interface FreezerObject {
    toJS?(): any,
    set?(newState: any): { now:() => void},
    reset?(object:any): { now:() => void},
}
export interface AppHub {
    trigger(key: string, ...params: any[]) : void,
    on(key: string, handler: (...params: any[]) => any)
    cacheState(): void,
    state: any
}

declare global {
    interface Array<T> extends FreezerObject {}
    interface Object extends FreezerObject {}
}

ReactDOM.render(React.createElement(SiteScriptApp), document.getElementById("root"));