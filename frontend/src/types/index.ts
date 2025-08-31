export type RecordArray = {
    DN: string,
    Attributes?: Array<Object>
}

export type NodeData = {
    title: string
    key:string
    isLeaf: boolean
    children?: NodeData[]
}

export type DNType = {
        DN: string,
        Attributes: Array<{Name:string, Values:string}>
}


export interface Schema {
    oid :string;
    name: string[];
    parent: string;
    description: string;
    type: "STRUCTURAL" | "AUXILIARY" | "ABSTRACT";
    must: string[] | null;
    may: string[] | null;
}

export interface SchemaData {
    schemas: {
        [key:string]: Schema;
    };
}