package ldap



type LdapObjClassOperation interface {
	GetObjAttrs(dn string) ([]string,[]string)
}


func (op *LDAPOperation)GetObjAttrs(dn string) ([]string,[]string) {

	obj, exist := op.ObjParser.Objects[dn]

	if exist {
		return obj.Must,obj.May
	}

	return nil,nil
}


