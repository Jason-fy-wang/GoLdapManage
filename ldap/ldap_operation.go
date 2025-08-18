package ldap

import (
	"errors"
	"fmt"
	"strings"

	gldap "github.com/go-ldap/ldap/v3"
)

type LdapOperation interface{
	Connect() error
	Authenicate() error
	Search(baseDN, filter string) ([]*gldap.Entry, error)
	Close() error
}

type LDAPOperation struct {
	Conn *gldap.Conn
	User string
	OriginUser string
	Pwd  string
	Host string
	Port int
}

func NewLDAPOperation(user, pwd, host string, port int) (*LDAPOperation, error) {
	originUser := user
	if user == "admin" {
		user = "cn=admin,dc=example,dc=com"
	}else if !strings.HasPrefix(user, "cn=") {
		user = fmt.Sprint("uid=", user, ",ou=person,dc=example,dc=com")
	}

	ldapOperation := LDAPOperation{
		User: user,
		OriginUser: originUser,
		Pwd:  pwd,
		Host: host,
		Port: port,
	}

	return &ldapOperation, nil
}

func (op *LDAPOperation) Connect() error {
	ldapUrl := fmt.Sprint("ldap://", op.Host, ":", op.Port)
	conn, err := gldap.DialURL(ldapUrl)
	if err != nil {
		return err
	}
	op.Conn = conn

	err = op.Conn.Bind(op.User, op.Pwd)
	if err != nil {
		return err
	}

	op.Conn = conn
	return nil
}

func (op *LDAPOperation) Authenicate() error {
	if op.Conn == nil {
		return errors.New("LDAP connection is not established")
	}
	var dn string
	if strings.Contains(op.User, "cn=admin") {
		dn = "dc=example,dc=com"
	}else{
		dn = op.User
	}
	req:= gldap.NewSearchRequest(
		dn,
		gldap.ScopeWholeSubtree,
		gldap.NeverDerefAliases,
		0, 0, false,
		"(objectClass=*)",
		nil,
		nil,
	)
	_, err := op.Conn.Search(req)

	return err
}

func (op *LDAPOperation) Search(baseDN, filter string) ([]*gldap.Entry, error) {
	if op.Conn == nil {
		return nil, gldap.NewError(gldap.LDAPResultUnavailable, errors.New("LDAP connection is not established"))
	}

	searchRequest := gldap.NewSearchRequest(
		baseDN,
		gldap.ScopeWholeSubtree,
		gldap.NeverDerefAliases,
		0, 0, false,
		filter,
		nil,
		nil,
	)

	result, err := op.Conn.Search(searchRequest)
	if err != nil {
		return nil, err
	}
	return result.Entries, nil
}

// Example: Retrieve objectClass attribute for a given DN
func (op *LDAPOperation) GetObjectClass(dn string) ([]string, error) {
	if op.Conn == nil {
		return nil, errors.New("LDAP connection is not established")
	}
	searchRequest := gldap.NewSearchRequest(
		dn,
		gldap.ScopeBaseObject,
		gldap.NeverDerefAliases,
		0, 0, false,
		"(objectClass=*)",
		[]string{"objectClass"}, // Only request objectClass attribute
		nil,
	)
	result, err := op.Conn.Search(searchRequest)
	if err != nil {
		return nil, err
	}
	if len(result.Entries) == 0 {
		return nil, errors.New("No entry found")
	}
	return result.Entries[0].GetAttributeValues("objectClass"), nil
}

// Example: Get MUST and MAY attributes for an objectClass from schema
func (op *LDAPOperation) GetObjectClassAttributes() ( err error) {
	if op.Conn == nil {
		return errors.New("LDAP connection is not established")
	}
	searchRequest := gldap.NewSearchRequest(
		"cn=subschema",
		gldap.ScopeBaseObject,
		gldap.NeverDerefAliases,
		0, 0, false,
		"(objectClass=*)",
		[]string{"objectClasses"},
		nil,
	)
	result, err := op.Conn.Search(searchRequest)
	if err != nil {
		return err
	}
	if len(result.Entries) == 0 {
		return errors.New("No schema entry found")
	}
	objectClasses := result.Entries[0].GetAttributeValues("objectClasses")
	// for _, oc := range objectClasses {
	// 	if strings.Contains(oc, "'"+objectClass+"'") || strings.Contains(oc, objectClass+" ") {
	// 		// Parse MUST and MAY from the objectClass definition string (simplified)
	// 		must = parseAttributeList(oc, "MUST")
	// 		may = parseAttributeList(oc, "MAY")
	// 		return must, may, nil
	// 	}
	// }
	fmt.Println(objectClasses)
	return nil
}

// Helper to parse attribute list from schema definition string
func parseAttributeList(def, keyword string) []string {
	idx := strings.Index(def, keyword)
	if idx == -1 {
		return nil
	}
	start := strings.Index(def[idx:], "(")
	end := strings.Index(def[idx:], ")")
	if start == -1 || end == -1 {
		return nil
	}
	attrs := def[idx+start+1 : idx+end]
	parts := strings.FieldsFunc(attrs, func(r rune) bool { return r == '$' || r == ' ' })
	var result []string
	for _, p := range parts {
		if p != "" {
			result = append(result, strings.TrimSpace(p))
		}
	}
	return result
}

func (op *LDAPOperation) Close() error {
	if op.Conn != nil {
		return op.Conn.Close()
	}
	return nil
}
