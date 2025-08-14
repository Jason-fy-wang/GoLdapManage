package ldap

import (
	"testing"
)

func TestLDAPOperation(t *testing.T) {
	baseDN := "dc=example,dc=com"
	filter := "(objectClass=*)"

	op, _ := NewLDAPOperation("","","192.168.20.10", 389)
	//op.User = fmt.Sprint("cn=", op.User, ",dc=example,dc=com")
	//err := op.Connect()
	// if err != nil {
	// 	t.Fatalf("Failed to connect to LDAP server: %v", err)
	// }

	if op.Conn == nil {
		t.Fatal("LDAP connection is nil after connecting")
	}
	defer op.Conn.Close()

	entries, err := op.Search(baseDN, filter)
	if err != nil {
		t.Fatalf("Failed to perform search: %v", err)
	}
	for _, entry := range entries {
		entry.PrettyPrint(2)
	}
	if len(entries) == 0 {
		t.Error("No entries found for the given filter")
	}
}
