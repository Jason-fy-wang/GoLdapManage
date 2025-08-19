package ldap

import (
	"os"
	"testing"
)

func TestLDAPOperation(t *testing.T) {
	user := "cn=admin,dc=example,dc=com"//os.Getenv("LDAP_USER")
	pwd := "loongson"// os.Getenv("LDAP_PASSWORD")
	baseDN := "ou=person,dc=example,dc=com"
	filter := "(objectClass=*)"
	if user == "" || pwd == "" {
		t.Skip("empty user info. skip test")
	}
	op, _ := NewLDAPOperation(user,pwd,"192.168.20.10", 389)
	//op.User = fmt.Sprint("cn=", op.User, ",dc=example,dc=com")
	err := op.Connect()
	if err != nil {
	 	t.Fatalf("Failed to connect to LDAP server: %v", err)
	 }

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


func TestAttributeOperation(t *testing.T){
	user := os.Getenv("LDAP_USER")
	pwd := os.Getenv("LDAP_PASSWORD")
	if user == "" || pwd == "" {
		t.Skip("invalud user info. skip unit test")
	}
	op, _ := NewLDAPOperation(user,pwd,"192.168.20.10", 389)
	//op.User = fmt.Sprint("cn=", op.User, ",dc=example,dc=com")
	err := op.Connect()
	if err != nil {
	 	t.Fatalf("Failed to connect to LDAP server: %v", err)
	 }

	if op.Conn == nil {
		t.Fatal("LDAP connection is nil after connecting")
	}
	defer op.Conn.Close()

	op.GetObjectClassAttributes()
}

