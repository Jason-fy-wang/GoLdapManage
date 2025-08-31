import { describe, expect, it } from "vitest";
import {buildRecordToMap,convertMapToTreeNode,getFullDN,getStructuralKey,getAuxiliary,getAbstruct,getObjectAttributes,removeDuplicateItem,checkLeafNode} from '../pages/api/utils'
import {treeNode} from "./data.set.ts"

describe('utils test', ()=>{
    const dns = [{
            DN: "dc=example,dc=com",
        },{
            DN: "ou=person,dc=example,dc=com",
        },{
            DN: "cn=john, ou=person, dc=example,dc=com"
        },
        {
            DN: "ou=HR,dc=example,dc=com"
        }
        ]

    it('test record to map', ()=> {
        const data = buildRecordToMap(dns)
        //printData(data)
        expect(data.get("dc=com")["children"]).exist
        expect(data.get("dc=com")["children"].size).toEqual(1)
        expect(data.get("dc=com")["children"].get("dc=example")).exist
        expect(data.get("dc=com")["children"].get("dc=example").key).toEqual("dc=example")
        expect(data.get("dc=com")["children"].get("dc=example").children.get("ou=person").key).toEqual("ou=person")
        
    })


    it("test map to tree", ()=>{
        const data = buildRecordToMap(dns)
        const tree = convertMapToTreeNode(data)
        console.log(JSON.stringify(tree))
        expect(tree[0].title).toEqual("dc=com")
        expect(tree[0].isLeaf).false
        expect(tree[0].key).toEqual("dc=com")
        expect(tree[0]!.children).exist

        expect(tree[0]!.children![0]!.title).exist
        expect(tree[0]!.children![0]!.key).exist
        expect(tree?.[0]?.children?.[0]?.children).toBeDefined()
        expect(tree?.[0]?.children?.[0]?.children?.[0]?.key).toBeDefined()

    })
    
    it("test full dn build", () => {
        const data = buildRecordToMap(dns)
        const tree = convertMapToTreeNode(data)
        //printData(tree)
        const dn = getFullDN(tree, "ou=person")
        expect(dn).toEqual("ou=person,dc=example,dc=com")
        const dn2 = getFullDN(tree, "cn=john")
        expect(dn2).toEqual("cn=john,ou=person,dc=example,dc=com")
        const dn3 = getFullDN(tree, "ou=HR")
        console.log("dn3 : ", dn3)
    })

})

// function printData(data:Map<string,any>) {
//     for(const entry of data.entries()) {
//             console.log(entry)
//             if(entry[1]["children"]) {
//                 printData(entry[1]["children"])
//             }
//         }
// }

import {data} from './data.set.ts'

describe("dn parse test", ()=> {
    it("get structural keys", ()=>{
        const vals = getStructuralKey(data)
        //console.log(vals)
        expect(vals.includes("OpenLDAPperson")).toBe(true)
        expect(vals).toContain("OpenLDAPperson")
    
    })

    it("get auxiliary key", () => {
        const valus = getAuxiliary(data)
        expect(valus).toContain("OpenLDAPdisplayableObject")
    })

    it("get abstruct key", ()=>{
        const valus = getAbstruct(data)
        expect(valus).toContain("top")
        expect(valus).toContain("olcConfig")
    })

    it("get attribute of obj OpenLDAPperson", ()=>{
        const attrs = getObjectAttributes(data, "OpenLDAPperson")
        //console.log(attrs)
        expect(attrs.must).toEqual(expect.arrayContaining(["uid","cn"]))
        expect(attrs.may).toEqual(expect.arrayContaining(["givenName","labeledURI","o"]))
    })

    it("get attribute of obj RFC822localPart", ()=>{
        const attrs = getObjectAttributes(data, "RFC822localPart")
        console.log(attrs)
        expect(attrs.may).toEqual(expect.arrayContaining(["commonName",
				"surname",
				"description",
				"telephoneNumber",
				"physicalDeliveryOfficeName",
				"postalAddress",
				"postalCode",
				"postOfficeBox",
				"streetAddress",
				"facsimileTelephoneNumber",
				"internationalISDNNumber",
				"teletexTerminalIdentifier",
				"telexNumber",
				"preferredDeliveryMethod",
				"destinationIndicator",
				"registeredAddress",
				"x121Address","associatedName",
				"organizationName",
				"businessCategory",
				"seeAlso",
				"searchGuide",
				"userPassword",
				"localityName",
				"stateOrProvinceName",
				]))
        
        expect(attrs.must).toEqual(expect.arrayContaining(["domainComponent", "objectClass"]))
    })

    it("test remove duplicate item", ()=> {
        let vals = ["1","1","2","2","3"]
        vals = removeDuplicateItem(vals)

        expect(vals).toEqual(expect.arrayContaining(["1","2","3"]))
    })

    it("test check leaf node", ()=> {
        let val = checkLeafNode("dc=com", treeNode)
        expect(val).toBeFalsy()

        val = checkLeafNode("dc=example", treeNode)
        expect(val).toBeFalsy()

        val = checkLeafNode("cn=mike", treeNode)
        expect(val).toBeTruthy()

        val = checkLeafNode("cn=john", treeNode)
        expect(val).toBeUndefined()

        val = checkLeafNode("uid=john", treeNode)
        expect(val).toBeTruthy()
    })
})

