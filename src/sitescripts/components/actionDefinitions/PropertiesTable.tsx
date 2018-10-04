import * as React from 'react';
import { ActionDefinition, ActionDefinitionProperty } from '../../data/interfaces';

export default class PropertiesTable extends React.PureComponent<PropertiesTableProps, {}> {
    renderRow = (property:ActionDefinitionProperty) => {
        return (
            <tr key={property.id}>
                {/* <td>{property.title}</td> */}
                <td>{property.id}</td>
                <td>{property.isRequired ? "Required": "Optional"}</td>
                <td>{property.description}</td>
            </tr>
        )
    }
    render() {
        return (
            <div className='properties-table-container'>
                <table>
                    <tbody>
                        {this.props.action.properties.map(this.renderRow)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export interface PropertiesTableProps {
    action: ActionDefinition
}