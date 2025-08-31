import type { TreeDataNode } from "antd"
import type {RecordArray, SchemaData} from '../../types/index'


const buildRecordToMap = (recordsArray: Array<RecordArray>) => {
    const treedata:Map<string,any> = new Map()
    let current = treedata
    for(const record of recordsArray){
        record.DN.split(",").reverse().forEach((item:string) => {
            item = item.trim()
            if(!current.has(item)) {
                current.set(item,
                    {
                        title: item,
                        key: item,
                        children: new Map<string,any>()
                    }
                )
            }
            current = current.get(item).children
        })
        current = treedata
    }

    return treedata
}

const convertMapToTreeNode = (data: Map<string,any>) => {
    const tree:TreeDataNode[]=[]

    for(const entry of data.entries()) {
        const obj: TreeDataNode = {
            title: entry[1].title,
            key: entry[1].key,
            isLeaf: false
        }
        if (entry[1].children && entry[1].children.size > 0) {
            obj.isLeaf = false
            obj.children = convertMapToTreeNode(entry[1].children)
        }else{
            obj.isLeaf = true
        }
        tree.push(obj)
    }

    return tree
}

// check if key is leaf node or not
const checkLeafNode = (key:string, tree: TreeDataNode[]):boolean|undefined => {
    for(const entry of tree) {
        if (entry.key === key) {
            if (entry.children && entry.children.length > 0){
                return false
            }else{
                return true
            }
        }
        if (entry.children && entry.children.length > 0) {
            return checkLeafNode(key, entry.children)
        }
    }
}

const getFullDN = (data:TreeDataNode[], dn: string) :string => {
    let path: string[] 

    function search (curdata: TreeDataNode[], result: string[]) {
         for (const node of curdata) {
            const newpath: string[] = [...result, node.key.toString()]
            if (node.key === dn) {
                return newpath
            }
            
            if (node.children && node.children.length > 0){
                const foundPath:string[] = search(node.children, newpath)
                if (foundPath && foundPath.length>0) {
                    return foundPath
                }
            }
        }
        return []
    }

   path = search(data, [])
   return path.reverse().join(",")
}

// "STRUCTURAL" | "AUXILIARY" | "ABSTRACT";
const getStructuralKey = (data :SchemaData) : string[] => {
    const vals:string[] = []
    for (const [key, schema] of Object.entries(data.schemas)) {

        if (schema.type === "STRUCTURAL" && schema.must !== null){
            vals.push(key)
        }
        //console.log("key: ", key, ", value: ", schema)
    }

    return vals
}

const getAuxiliary = (data:SchemaData) :string[] => {
        const vals:string[] = []
    for (const [key, schema] of Object.entries(data.schemas)) {

        if (schema.type === "AUXILIARY"){
            vals.push(key)
        }
    }

    return vals
}

const getAbstruct = (data: SchemaData) :string[] => {
    const vals:string[] = []
    for (const [key, schema] of Object.entries(data.schemas)) {

        if (schema.type === "ABSTRACT"){
            vals.push(key)
        }
    }
    return vals
}


const getObjectAttributes = (data:SchemaData, obj: string)  => {
    const val = data.schemas[obj]
    if (val.must === null) {
        val.must = []
    }
    if (val.may === null){
        val.may = []
    }
    
    let parent = val.parent

    while(parent !== "" && parent !== null){
        const tmp = data.schemas[parent].must
        if (tmp !== null) {
            val.must.push(...tmp)
        }
        const tm = data.schemas[parent].may
        if (tm !== null) {
            val.may.push(...tm)
        }
        parent = data.schemas[parent].parent
    }
    val.must = removeDuplicateItem(val.must)
    val.may = removeDuplicateItem(val.may)
    return val
}

const removeDuplicateItem = (data: string[]) => {
    return [...new Set(data)]
}



export {buildRecordToMap,convertMapToTreeNode,getFullDN,getStructuralKey,getAuxiliary,getAbstruct,getObjectAttributes,removeDuplicateItem,checkLeafNode}
