package ldap

import (
	"errors"
	"regexp"
	"strings"
)

type ObjectClass struct {
	Oid string   	`json:"oid"`
	Name []string	`json:"name"`
	Parent string	`json:"parent"`
	Description string	`json:"description"`
	Type string		`json:"type"`
	Must []string	`json:"must"`
	May []string	`json:"may"`
}

const (
	STRUCTURAL = "STRUCTURAL"
	ABSTRACT = "ABSTRACT"
	AUXILIARY = "AUXILIARY"
)

type ObjectClassParser struct {
	Objects map[string]*ObjectClass   `json:"objects"`
}

func NewObjectClassParser() *ObjectClassParser {
	return &ObjectClassParser{
		Objects: make(map[string]*ObjectClass),
	}
}

// ( 2.5.6.0 NAME 'top' DESC 'top of the superclass chain' ABSTRACT MUST objectClass )
// ( 2.5.6.4 NAME 'organization' DESC 'RFC2256: an organization' SUP top STRUCTURAL MUST o MAY ( userPassword $ searchGuide $ seeAlso $ businessCategory $ x121Address $ registeredAddress $ destinationIndicator $ preferredDeliveryMethod $ telexNumber $ teletexTerminalIdentifier $ telephoneNumber $  internationaliSDNNumber $ facsimileTelephoneNumber $ street $ postOfficeBox $ postalCode $ postalAddress $ physicalDeliveryOfficeName $ st $ l $ description ) )
func (p *ObjectClassParser) ParseObjectClass(presention string) (*ObjectClass, error) {
	obj := &ObjectClass{}
	presention = strings.Trim(presention," (")

	// oid
	oidPattern := regexp.MustCompile(`^[\d.]+`)
	oid := oidPattern.FindString(presention)
	obj.Oid = oid

	// name
	namePattern := regexp.MustCompile(`NAME\s+'([-\w]+)'|NAME\s+\(\s*([^)]+)\s*\)`)
	matches := namePattern.FindStringSubmatch(presention)
	if len(matches) == 0 {
		return nil,errors.New("invalid name")
	}
	if matches[1] != ""{
		obj.Name = append(obj.Name, matches[1])
	}else if matches[2] != ""{
		obj.Name = p.ParseObjectNames(matches[2])
	}
	// desc
	descPattern := regexp.MustCompile(`DESC\s+'([^']+)'`)
	matches = descPattern.FindStringSubmatch(presention)
	if len(matches)==2 {
		obj.Description = ""
	}else if len(matches) == 2 {
		obj.Description = matches[1]
	}
	

	// parent
	if obj.Name[0] == "top"{
		obj.Parent = ""
	}else{
		supPattern := regexp.MustCompile(`SUP\s+(\w+)`)
		matches = supPattern.FindStringSubmatch(presention)
		if len(matches) == 0{
			obj.Parent = ""
		}else if len(matches) == 2 {
			obj.Parent = matches[1]
		}
	}
	// type
	if strings.Contains(presention, STRUCTURAL) {
		obj.Type = STRUCTURAL
	}else if strings.Contains(presention, AUXILIARY) {
		obj.Type = AUXILIARY		
	}else if strings.Contains(presention, ABSTRACT) {
		obj.Type = ABSTRACT
	}else {
		return nil,errors.New("invalid TYPE")
	}

	// must
	mustPattern := regexp.MustCompile(`MUST\s+(\w+)|MUST\s+\(\s*([^)]+)\s*\)`)
	matches = mustPattern.FindStringSubmatch(presention)
	if len(matches) > 0 {
		if matches[1] != "" {
			var tmp string = matches[1]
			obj.Must = append(obj.Must, tmp)
		}else if matches[2] != ""{
			res, err := p.ParseAttributeList(matches[2])
			if err != nil {
				return nil,err
			}
			obj.Must = append(obj.Must,res...)
		}
	}

	// may
	mayPattern := regexp.MustCompile(`MAY\s+(\w+)|MAY\s+\(\s*([^)]+)\s*\)`)
	matches = mayPattern.FindStringSubmatch(presention)
	
	if len(matches) > 0 {
		if matches[1] != "" {
			var tmp string = matches[1]
			obj.May = append(obj.May, tmp)
		}else if matches[2] != ""{
			res, err := p.ParseAttributeList(matches[2])
			if err != nil {
				return nil,err
			}
			obj.May = append(obj.May,res...)
		}
	}
	for _, nm := range obj.Name {
		p.Objects[nm] = obj
	}
	return  obj,nil
}

func (p *ObjectClassParser) ParseObjectNames(names string) []string {
	var nms []string
	items := strings.Split(names, " ")
	for _, item := range items {
		item = strings.Trim(item," '")
		if item != "" {
			nms = append(nms, item)
		}
	}
	return nms
}

func (p *ObjectClassParser) ParseAttributeList(attrs string, ) ([]string, error){
	fields := strings.Split(attrs, "$")
	var results []string

	for _, field := range fields {
		field = strings.TrimSpace(field)
		results = append(results, field)
	}
	return results,nil
}

func (p *ObjectClassParser) ParseObjects(definition []string) error {

	for _, item := range definition {
		_, err := p.ParseObjectClass(item)
		if err != nil {
			return err
		}
	}

	return nil
}

func (p *ObjectClassParser) GetInheritenceChain(obj string) []string {
	var result [] string

	for obj != "" {
		if objclass, exist := p.Objects[obj]; exist {
			result = append(result, objclass.Name...)
			obj = objclass.Parent
		}
	}
	
	return p.RemoveDuplicates(result)
}


func (p *ObjectClassParser) GetAllAttributees(objclass string) ([]string, []string){
	var must,may []string

	chains := p.GetInheritenceChain(objclass)

	for _, item := range chains {
		obj := p.Objects[item]
		must = append(must, obj.Must...)
		may = append(may, obj.May...)
	}
	return p.RemoveDuplicates(must), p.RemoveDuplicates(may)
}


func (p *ObjectClassParser) RemoveDuplicates(vals []string) []string {
	keys := make(map[string]bool)
	var result []string
	for _, item:=range vals {
		if !keys[item] {
			keys[item] = true
			result = append(result, item)
		}
	}
	return result
}

