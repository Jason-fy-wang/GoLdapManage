package ldap

import (
	"slices"
	"testing"
)



func TestObjectParse(t *testing.T){
	parses := []struct {
		inputs string
		expect ObjectClass
		name string
	}{
		{
			inputs: "( 2.5.6.12 NAME 'applicationEntity' DESC 'RFC2256: an application entity' SUP top STRUCTURAL MUST ( presentationAddress $ cn ) MAY ( supportedApplicationContext $ seeAlso $ ou $ o $ l $ description ) )",
			expect: ObjectClass{
				Oid: "2.5.6.12",
				Name: []string{"applicationEntity"},
				Parent: "top",
				Description: "RFC2256: an application entity",
				Type: STRUCTURAL,
				Must: []string{"presentationAddress","cn"},
				May: []string{"supportedApplicationContext","seeAlso","ou","o","l","description"},
			},
			name: "applicationEntity",
			
		},
		{
			inputs: "( 2.5.6.0 NAME 'top' DESC 'top of the superclass chain' ABSTRACT MUST objectClass )",
			expect: ObjectClass{
				Oid: "2.5.6.0",
				Name: []string{"top"},
				Parent: "",
				Description: "top of the superclass chain",
				Type: ABSTRACT,
				Must: []string{"objectClass"},
				May: []string{},
			},
			name: "top",
		},
		{
			inputs: "( 2.5.6.4 NAME 'organization' DESC 'RFC2256: an organization' SUP top STRUCTURAL MUST o MAY ( userPassword $ searchGuide $ seeAlso $ businessCategory $ x121Address $ registeredAddress $ destinationIndicator $ preferredDeliveryMethod $ telexNumber $ teletexTerminalIdentifier $ telephoneNumber $  internationaliSDNNumber $ facsimileTelephoneNumber $ street $ postOfficeBox $ postalCode $ postalAddress $ physicalDeliveryOfficeName $ st $ l $ description ) )",
			expect: ObjectClass{
				Oid: "2.5.6.4",
				Name: []string{"organization"},
				Parent: "top",
				Description: "RFC2256: an organization",
				Type: STRUCTURAL,
				Must: []string{"o"},
				May: []string{"userPassword","searchGuide","seeAlso","businessCategory","x121Address","registeredAddress","destinationIndicator","preferredDeliveryMethod","telexNumber","teletexTerminalIdentifier","telephoneNumber","internationaliSDNNumber","facsimileTelephoneNumber","street","postOfficeBox","postalCode","postalAddress","physicalDeliveryOfficeName","st","l","description"},
			},
			name: "organization",
		},
		{
			inputs: "( 1.3.6.1.4.1.4203.1.4.1 NAME ( 'OpenLDAProotDSE' 'LDAProotDSE') DESC 'OpenLDAP Root DSE object' SUP top STRUCTURAL MAY cn )",
			expect: ObjectClass{
				Oid: "1.3.6.1.4.1.4203.1.4.1",
				Name: []string{"OpenLDAProotDSE","LDAProotDSE"},
				Parent: "top",
				Description: "OpenLDAP Root DSE object",
				Type: STRUCTURAL,
				Must: []string{},
				May: []string{"cn"},
			},
			name: "OpenLDAProotDSE",
		},
	}
	parser := NewObjectClassParser()

	for _, item := range parses {
		if _, err := parser.ParseObjectClass(item.inputs); err != nil{
			t.Fatal(err)
		}
		name := item.name
		if parser.Objects[name].Oid != item.expect.Oid {
			t.Errorf("get value: %s, expect: %s", parser.Objects[name].Oid, item.expect.Oid)
		}

		if !slices.Equal(parser.Objects[name].Name, item.expect.Name) {
			t.Errorf("get value: %s, expect: %s", parser.Objects[name].Name, item.expect.Name)
		}

		if parser.Objects[name].Description != item.expect.Description {
			t.Errorf("get value: %s, expect: %s", parser.Objects[name].Description, item.expect.Description)
		}

		if parser.Objects[name].Type != item.expect.Type {
			t.Errorf("get value: %s, expect: %s", parser.Objects[name].Type, ABSTRACT)
		}

		if len(parser.Objects[name].Must) != len(item.expect.Must) {
			t.Errorf("get length: %d, expect %d", len(parser.Objects[name].Must), len(item.expect.Must))
		}

		if len(parser.Objects[name].May) != len(item.expect.May) {
			t.Errorf("get length: %d, expect %d", len(parser.Objects[name].May), len(item.expect.May))
		}
		
		if !slices.Equal(parser.Objects[name].Must, item.expect.Must) {
			t.Errorf("get value: %s, expect: %s",parser.Objects[name].Must, item.expect.Must)
		}
		
		if !slices.Equal(parser.Objects[name].May, item.expect.May) {
			t.Errorf("get value: %s, expect: %s",parser.Objects[name].May, item.expect.May)
		}
	}

	//names := []string{"OpenLDAProotDSE", "LDAProotDSE","organization","applicationEntity","top"}

	values := []struct {
		name string
		chain []string
		must []string
		may []string
	}{
		{
			name: "OpenLDAProotDSE",
			chain: []string{"OpenLDAProotDSE", "LDAProotDSE", "top"},
			must: []string{"objectClass"},
			may: []string{"cn"},
		},
		{
			name: "LDAProotDSE",
			chain: []string{"OpenLDAProotDSE","LDAProotDSE", "top"},
			must: []string{"objectClass"},
			may: []string{"cn"},
		},
		{
			name: "organization",
			chain: []string{"organization", "top"},
			must: []string{"o","objectClass"},
			may: []string{"userPassword","searchGuide","seeAlso","businessCategory","x121Address","registeredAddress","destinationIndicator","preferredDeliveryMethod","telexNumber","teletexTerminalIdentifier","telephoneNumber","internationaliSDNNumber","facsimileTelephoneNumber","street","postOfficeBox","postalCode","postalAddress","physicalDeliveryOfficeName","st","l","description"},
		},
		{
			name: "applicationEntity",
			chain: []string{"applicationEntity", "top"},
			must: []string{"presentationAddress","cn","objectClass"},
			may: []string{"supportedApplicationContext", "seeAlso", "ou","o","l","description"},
		},
		{
			name: "top",
			chain: []string{"top"},
			must: []string{"objectClass"},
			may: []string{},
		},
	}

	for _, value := range values{
		chain := parser.GetInheritenceChain(value.name)
		t.Logf("chain %v", chain)
		if !slices.Equal(chain, value.chain){
			t.Errorf("get value: %s, expect: %s", chain, value.chain)
		}

		musts, mays := parser.GetAllAttributees(value.name)
		t.Logf("musts: %v, may: %s: ", musts, mays)
		if !slices.Equal(musts, value.must) {
			t.Errorf("get must: %v, expect %v:", musts, value.must)
		}
		if !slices.Equal(mays, value.may) {
			t.Errorf("get may: %v, expect %v", mays, value.may)
		}
	}


}



