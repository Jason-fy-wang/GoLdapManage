package ldap

import (
	"errors"
	"fmt"
	"strings"

	gldap "github.com/go-ldap/ldap/v3"
)

type LDAPOperation struct {
	Conn *gldap.Conn
	User string
	Pwd  string
	Host string
	Port int
}

func NewLDAPOperation(user, pwd, host string, port int) (*LDAPOperation, error) {
	//user := os.Getenv("LDAP_USER")
	//pwd := os.Getenv("LDAP_PASSWORD")
	ldapOperation := LDAPOperation{
		User: user,
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

func (op *LDAPOperation) Close() error {
	if op.Conn != nil {
		return op.Conn.Close()
	}
	return nil
}
