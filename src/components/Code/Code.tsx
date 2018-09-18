import * as React from "react";
import CodeMirror from "react-codemirror";
import "codemirror/addon/selection/active-line.js"
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
// import "codemirror/mode/jsx/jsx";
// import "codemirror/mode/sass/sass";
import "codemirror/theme/monokai.css";
import "./Code.scss";

export default class Code extends React.Component<CodeProps, {}> {
    editor:any
    componentDidMount() {
        setTimeout(() => this.updateCode(this.props.value), 1);
    }
    updateCode = (newValue) => {
        if (this.editor && this.editor.getCodeMirror) {
            this.editor.getCodeMirror().setValue(newValue);
        }
    }
    getCode = () => {
        if (this.editor && this.editor.getCodeMirror) {
            return this.editor.getCodeMirror().getValue();
        }
        return "";
    }
    shouldComponentUpdate(newProps) {
        if (newProps.value !== this.getCode()) {
            this.updateCode(newProps.value);
        }
        return false;
    }
    render() {
        var { language, onChange, opts } = this.props;
        var options = {...{ 
            mode: language,
            lineNumbers: true,
            indentUnit: 4,
            indentWithTabs: true,
            // autofocus: true,
            styleActiveLine:true,
            theme: "monokai",
        }, ...opts };

        return (
            <CodeMirror ref={el => this.editor = el } options={options} preserveScrollPosition={true} onChange={onChange} />
        )
    }
}

export interface CodeProps {
    value: string,
    language:string,
    onChange: (value:string) => void
    opts?: any
}