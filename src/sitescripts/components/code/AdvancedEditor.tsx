import * as React from 'react';
import Code from '../../../components/Code/Code';
import hub from '../../hub/hub';

export default class AdvancedEditor extends React.PureComponent<AdvancedEditorProps, {}> {
    onChange = (newValue) => {
        hub.trigger("json:update", newValue);
    }
    render() {
        return (
            <div>
                <Code value={this.props.json} onChange={this.onChange} language="javascript" />
            </div>
        );
    }
}

export interface AdvancedEditorProps {
    json: string
}