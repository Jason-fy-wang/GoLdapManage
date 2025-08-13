package ldap

import (
	"errors"
	"fmt"
	"os"

	gldap "github.com/go-ldap/ldap/v3"
)

type LDAPOperation struct {
	Conn *gldap.Conn
	User string
	Pwd  string
	Host string
	Port int
}

func NewLDAPOperation(host string, port int) (*LDAPOperation, error) {
	user := os.Getenv("LDAP_USER")
	pwd := os.Getenv("LDAP_PASSWORD")

	ldapOperation := LDAPOperation{
		User: user,
		Pwd:  pwd,
		Host: host,
		Port: port,
	}
	if err := ldapOperation.Connect(); err != nil {
		fmt.Printf("Failed to connect to LDAP server: %v\n", err)
		return nil, err
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
