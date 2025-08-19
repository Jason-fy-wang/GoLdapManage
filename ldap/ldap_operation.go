package ldap

import (
	"errors"
	"fmt"
	"log"
	"strings"

	gldap "github.com/go-ldap/ldap/v3"
)

type LdapOperation interface{
	Connect() error
	Authenicate() error
	Search(baseDN, filter string) ([]*gldap.Entry, error)
	GetAttrOfObjectClass(dn string) ([]*gldap.Entry, error) 
	GetObjectClassAttributes() error
	Close() error
}

type LDAPOperation struct {
	Conn *gldap.Conn
	User string
	OriginUser string
	Pwd  string
	Host string
	Port int
    ObjParser *ObjectClassParser
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
		ObjParser: NewObjectClassParser(),
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
func (op *LDAPOperation) GetAttrOfObjectClass(dn string) ([]*gldap.Entry, error) {
	if op.Conn == nil {
		return nil, errors.New("LDAP connection is not established")
	}
	searchRequest := gldap.NewSearchRequest(
		dn,
		gldap.ScopeBaseObject,   // base : dn self;   one:  one level of child;  all: search all child entry
		gldap.NeverDerefAliases,
		0, 0, false,
		"(objectClass=*)",
		[]string{},  // request all attributes
		nil,
	)
	result, err := op.Conn.Search(searchRequest)
	if err != nil {
		return nil, err
	}
	if len(result.Entries) == 0 {
		return nil, errors.New("no entry found")
	}
	return result.Entries, nil
}

func (op *LDAPOperation) GetObjectClassAttributes() error {
	if op.Conn == nil {
		return errors.New("LDAP connection is not established")
	}
	if len(op.ObjParser.Objects) > 0{
		return nil
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
		return errors.New("no schema entry found")
	}
	objectClasses := result.Entries[0].GetAttributeValues("objectClasses")
	for _, item := range objectClasses {
		if _, err := op.ObjParser.ParseObjectClass(item); err != nil {
			log.Fatal("parse objectclass error: ", err, item)
			return err
		}
	}
	return nil
}

func (op *LDAPOperation) Close() error {
	if op.Conn != nil {
		return op.Conn.Close()
	}
	return nil
}
