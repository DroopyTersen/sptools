
export interface ActionDefinition {
    id: string,
    title: string,
    description: string,
    properties: ActionDefinitionProperty[],
    subactions?: ActionDefinition[],
    type: string,
}

export interface ActionDefinitionProperty {
    id: string,
    title: string,
    description: string,
    type: string, //string, object, array, number
    isRequired: boolean,
}

export interface ActionProperty extends ActionDefinitionProperty {
    value?: any
}

export interface SiteScriptAction extends ActionDefinition {
    guid: string,
    properties: ActionProperty[]
}