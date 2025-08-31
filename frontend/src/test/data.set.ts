import type { TreeDataNode } from "antd";
import type { SchemaData } from "../types";

export const data:SchemaData = {
	"schemas": {
		"LDAProotDSE": {
			"oid": "1.3.6.1.4.1.4203.1.4.1",
			"name": [
				"OpenLDAProotDSE",
				"LDAProotDSE"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": null,
			"may": [
				"cn"
			]
		},
		"OpenLDAPdisplayableObject": {
			"oid": "1.3.6.1.4.1.4203.1.4.6",
			"name": [
				"OpenLDAPdisplayableObject"
			],
			"parent": "",
			"description": "",
			"type": "AUXILIARY",
			"must": null,
			"may": [
				"displayName"
			]
		},
		"OpenLDAPorg": {
			"oid": "1.3.6.1.4.1.4203.1.4.3",
			"name": [
				"OpenLDAPorg"
			],
			"parent": "organization",
			"description": "",
			"type": "STRUCTURAL",
			"must": null,
			"may": [
				"buildingName",
				"displayName",
				"labeledURI"
			]
		},
		"OpenLDAPou": {
			"oid": "1.3.6.1.4.1.4203.1.4.4",
			"name": [
				"OpenLDAPou"
			],
			"parent": "organizationalUnit",
			"description": "",
			"type": "STRUCTURAL",
			"must": null,
			"may": [
				"buildingName",
				"displayName",
				"labeledURI",
				"o"
			]
		},
		"OpenLDAPperson": {
			"oid": "1.3.6.1.4.1.4203.1.4.5",
			"name": [
				"OpenLDAPperson"
			],
			"parent": "",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"uid",
				"cn"
			],
			"may": [
				"givenName",
				"labeledURI",
				"o"
			]
		},
		"OpenLDAProotDSE": {
			"oid": "1.3.6.1.4.1.4203.1.4.1",
			"name": [
				"OpenLDAProotDSE",
				"LDAProotDSE"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": null,
			"may": [
				"cn"
			]
		},
		"RFC822localPart": {
			"oid": "0.9.2342.19200300.100.4.14",
			"name": [
				"RFC822localPart"
			],
			"parent": "domain",
			"description": "",
			"type": "STRUCTURAL",
			"must": null,
			"may": [
				"commonName",
				"surname",
				"description",
				"seeAlso",
				"telephoneNumber",
				"physicalDeliveryOfficeName",
				"postalAddress",
				"postalCode",
				"postOfficeBox",
				"streetAddress",
				"facsimileTelephoneNumber",
				"internationalISDNNumber",
				"telephoneNumber",
				"teletexTerminalIdentifier",
				"telexNumber",
				"preferredDeliveryMethod",
				"destinationIndicator",
				"registeredAddress",
				"x121Address"
			]
		},
		"account": {
			"oid": "0.9.2342.19200300.100.4.5",
			"name": [
				"account"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"userid"
			],
			"may": [
				"description",
				"seeAlso",
				"localityName",
				"organizationName",
				"organizationalUnitName",
				"host"
			]
		},
		"alias": {
			"oid": "2.5.6.1",
			"name": [
				"alias"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"aliasedObjectName"
			],
			"may": null
		},
		"applicationEntity": {
			"oid": "2.5.6.12",
			"name": [
				"applicationEntity"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"presentationAddress",
				"cn"
			],
			"may": [
				"supportedApplicationContext",
				"seeAlso",
				"ou",
				"o",
				"l",
				"description"
			]
		},
		"applicationProcess": {
			"oid": "2.5.6.11",
			"name": [
				"applicationProcess"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"cn"
			],
			"may": [
				"seeAlso",
				"ou",
				"l",
				"description"
			]
		},
		"bootableDevice": {
			"oid": "1.3.6.1.1.1.2.12",
			"name": [
				"bootableDevice"
			],
			"parent": "top",
			"description": "",
			"type": "AUXILIARY",
			"must": null,
			"may": [
				"bootFile",
				"bootParameter"
			]
		},
		"cRLDistributionPoint": {
			"oid": "2.5.6.19",
			"name": [
				"cRLDistributionPoint"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"cn"
			],
			"may": [
				"certificateRevocationList",
				"authorityRevocationList",
				"deltaRevocationList"
			]
		},
		"certificationAuthority": {
			"oid": "2.5.6.16",
			"name": [
				"certificationAuthority"
			],
			"parent": "top",
			"description": "",
			"type": "AUXILIARY",
			"must": [
				"authorityRevocationList",
				"certificateRevocationList",
				"cACertificate"
			],
			"may": [
				"crossCertificatePair"
			]
		},
		"certificationAuthority-V2": {
			"oid": "2.5.6.16.2",
			"name": [
				"certificationAuthority-V2"
			],
			"parent": "certificationAuthority",
			"description": "",
			"type": "AUXILIARY",
			"must": null,
			"may": [
				"deltaRevocationList"
			]
		},
		"country": {
			"oid": "2.5.6.2",
			"name": [
				"country"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"c"
			],
			"may": [
				"searchGuide",
				"description"
			]
		},
		"dNSDomain": {
			"oid": "0.9.2342.19200300.100.4.15",
			"name": [
				"dNSDomain"
			],
			"parent": "domain",
			"description": "",
			"type": "STRUCTURAL",
			"must": null,
			"may": [
				"ARecord",
				"MDRecord",
				"MXRecord",
				"NSRecord",
				"SOARecord",
				"CNAMERecord"
			]
		},
		"dSA": {
			"oid": "2.5.6.13",
			"name": [
				"dSA"
			],
			"parent": "applicationEntity",
			"description": "",
			"type": "STRUCTURAL",
			"must": null,
			"may": [
				"knowledgeInformation"
			]
		},
		"dcObject": {
			"oid": "1.3.6.1.4.1.1466.344",
			"name": [
				"dcObject"
			],
			"parent": "top",
			"description": "",
			"type": "AUXILIARY",
			"must": [
				"dc"
			],
			"may": null
		},
		"deltaCRL": {
			"oid": "2.5.6.23",
			"name": [
				"deltaCRL"
			],
			"parent": "top",
			"description": "",
			"type": "AUXILIARY",
			"must": null,
			"may": [
				"deltaRevocationList"
			]
		},
		"device": {
			"oid": "2.5.6.14",
			"name": [
				"device"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"cn"
			],
			"may": [
				"serialNumber",
				"seeAlso",
				"owner",
				"ou",
				"o",
				"l",
				"description"
			]
		},
		"dmd": {
			"oid": "2.5.6.20",
			"name": [
				"dmd"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"dmdName"
			],
			"may": [
				"userPassword",
				"searchGuide",
				"seeAlso",
				"businessCategory",
				"x121Address",
				"registeredAddress",
				"destinationIndicator",
				"preferredDeliveryMethod",
				"telexNumber",
				"teletexTerminalIdentifier",
				"telephoneNumber",
				"internationaliSDNNumber",
				"facsimileTelephoneNumber",
				"street",
				"postOfficeBox",
				"postalCode",
				"postalAddress",
				"physicalDeliveryOfficeName",
				"st",
				"l",
				"description"
			]
		},
		"document": {
			"oid": "0.9.2342.19200300.100.4.6",
			"name": [
				"document"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"documentIdentifier"
			],
			"may": [
				"commonName",
				"description",
				"seeAlso",
				"localityName",
				"organizationName",
				"organizationalUnitName",
				"documentTitle",
				"documentVersion",
				"documentAuthor",
				"documentLocation",
				"documentPublisher"
			]
		},
		"documentSeries": {
			"oid": "0.9.2342.19200300.100.4.9",
			"name": [
				"documentSeries"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"commonName"
			],
			"may": [
				"description",
				"seeAlso",
				"telephonenumber",
				"localityName",
				"organizationName",
				"organizationalUnitName"
			]
		},
		"domain": {
			"oid": "0.9.2342.19200300.100.4.13",
			"name": [
				"domain"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"domainComponent"
			],
			"may": [
				"associatedName",
				"organizationName",
				"description",
				"businessCategory",
				"seeAlso",
				"searchGuide",
				"userPassword",
				"localityName",
				"stateOrProvinceName",
				"streetAddress",
				"physicalDeliveryOfficeName",
				"postalAddress",
				"postalCode",
				"postOfficeBox",
				"streetAddress",
				"facsimileTelephoneNumber",
				"internationalISDNNumber",
				"telephoneNumber",
				"teletexTerminalIdentifier",
				"telexNumber",
				"preferredDeliveryMethod",
				"destinationIndicator",
				"registeredAddress",
				"x121Address"
			]
		},
		"domainRelatedObject": {
			"oid": "0.9.2342.19200300.100.4.17",
			"name": [
				"domainRelatedObject"
			],
			"parent": "top",
			"description": "",
			"type": "AUXILIARY",
			"must": [
				"associatedDomain"
			],
			"may": null
		},
		"dynamicObject": {
			"oid": "1.3.6.1.4.1.1466.101.119.2",
			"name": [
				"dynamicObject"
			],
			"parent": "top",
			"description": "",
			"type": "AUXILIARY",
			"must": null,
			"may": null
		},
		"extensibleObject": {
			"oid": "1.3.6.1.4.1.1466.101.120.111",
			"name": [
				"extensibleObject"
			],
			"parent": "top",
			"description": "",
			"type": "AUXILIARY",
			"must": null,
			"may": null
		},
		"friendlyCountry": {
			"oid": "0.9.2342.19200300.100.4.18",
			"name": [
				"friendlyCountry"
			],
			"parent": "country",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"friendlyCountryName"
			],
			"may": null
		},
		"groupOfNames": {
			"oid": "2.5.6.9",
			"name": [
				"groupOfNames"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"member",
				"cn"
			],
			"may": [
				"businessCategory",
				"seeAlso",
				"owner",
				"ou",
				"o",
				"description"
			]
		},
		"groupOfUniqueNames": {
			"oid": "2.5.6.17",
			"name": [
				"groupOfUniqueNames"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"uniqueMember",
				"cn"
			],
			"may": [
				"businessCategory",
				"seeAlso",
				"owner",
				"ou",
				"o",
				"description"
			]
		},
		"ieee802Device": {
			"oid": "1.3.6.1.1.1.2.11",
			"name": [
				"ieee802Device"
			],
			"parent": "top",
			"description": "",
			"type": "AUXILIARY",
			"must": null,
			"may": [
				"macAddress"
			]
		},
		"inetOrgPerson": {
			"oid": "2.16.840.1.113730.3.2.2",
			"name": [
				"inetOrgPerson"
			],
			"parent": "organizationalPerson",
			"description": "",
			"type": "STRUCTURAL",
			"must": null,
			"may": [
				"audio",
				"businessCategory",
				"carLicense",
				"departmentNumber",
				"displayName",
				"employeeNumber",
				"employeeType",
				"givenName",
				"homePhone",
				"homePostalAddress",
				"initials",
				"jpegPhoto",
				"labeledURI",
				"mail",
				"manager",
				"mobile",
				"o",
				"pager",
				"photo",
				"roomNumber",
				"secretary",
				"uid",
				"userCertificate",
				"x500uniqueIdentifier",
				"preferredLanguage",
				"userSMIMECertificate",
				"userPKCS12"
			]
		},
		"ipHost": {
			"oid": "1.3.6.1.1.1.2.6",
			"name": [
				"ipHost"
			],
			"parent": "top",
			"description": "",
			"type": "AUXILIARY",
			"must": [
				"cn",
				"ipHostNumber"
			],
			"may": [
				"l",
				"description",
				"manager"
			]
		},
		"ipNetwork": {
			"oid": "1.3.6.1.1.1.2.7",
			"name": [
				"ipNetwork"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"cn",
				"ipNetworkNumber"
			],
			"may": [
				"ipNetmaskNumber",
				"l",
				"description",
				"manager"
			]
		},
		"ipProtocol": {
			"oid": "1.3.6.1.1.1.2.4",
			"name": [
				"ipProtocol"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"cn",
				"ipProtocolNumber",
				"description"
			],
			"may": [
				"description"
			]
		},
		"ipService": {
			"oid": "1.3.6.1.1.1.2.3",
			"name": [
				"ipService"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"cn",
				"ipServicePort",
				"ipServiceProtocol"
			],
			"may": [
				"description"
			]
		},
		"labeledURIObject": {
			"oid": "1.3.6.1.4.1.250.3.15",
			"name": [
				"labeledURIObject"
			],
			"parent": "top",
			"description": "",
			"type": "AUXILIARY",
			"must": null,
			"may": [
				"labeledURI"
			]
		},
		"locality": {
			"oid": "2.5.6.3",
			"name": [
				"locality"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": null,
			"may": [
				"street",
				"seeAlso",
				"searchGuide",
				"st",
				"l",
				"description"
			]
		},
		"newPilotPerson": {
			"oid": "0.9.2342.19200300.100.4.4",
			"name": [
				"pilotPerson",
				"newPilotPerson"
			],
			"parent": "person",
			"description": "",
			"type": "STRUCTURAL",
			"must": null,
			"may": [
				"userid",
				"textEncodedORAddress",
				"rfc822Mailbox",
				"favouriteDrink",
				"roomNumber",
				"userClass",
				"homeTelephoneNumber",
				"homePostalAddress",
				"secretary",
				"personalTitle",
				"preferredDeliveryMethod",
				"businessCategory",
				"janetMailbox",
				"otherMailbox",
				"mobileTelephoneNumber",
				"pagerTelephoneNumber",
				"organizationalStatus",
				"mailPreferenceOption",
				"personalSignature"
			]
		},
		"nisMap": {
			"oid": "1.3.6.1.1.1.2.9",
			"name": [
				"nisMap"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"nisMapName"
			],
			"may": [
				"description"
			]
		},
		"nisNetgroup": {
			"oid": "1.3.6.1.1.1.2.8",
			"name": [
				"nisNetgroup"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"cn"
			],
			"may": [
				"nisNetgroupTriple",
				"memberNisNetgroup",
				"description"
			]
		},
		"nisObject": {
			"oid": "1.3.6.1.1.1.2.10",
			"name": [
				"nisObject"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"cn",
				"nisMapEntry",
				"nisMapName"
			],
			"may": [
				"description"
			]
		},
		"olcBackendConfig": {
			"oid": "1.3.6.1.4.1.4203.1.12.2.4.0.3",
			"name": [
				"olcBackendConfig"
			],
			"parent": "olcConfig",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"olcBackend"
			],
			"may": null
		},
		"olcBdbConfig": {
			"oid": "1.3.6.1.4.1.4203.1.12.2.4.2.1.1",
			"name": [
				"olcBdbConfig"
			],
			"parent": "olcDatabaseConfig",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"olcDbDirectory"
			],
			"may": [
				"olcDbCacheSize",
				"olcDbCheckpoint",
				"olcDbChecksum",
				"olcDbConfig",
				"olcDbCryptFile",
				"olcDbCryptKey",
				"olcDbNoSync",
				"olcDbDirtyRead",
				"olcDbIDLcacheSize",
				"olcDbIndex",
				"olcDbLinearIndex",
				"olcDbLockDetect",
				"olcDbMode",
				"olcDbSearchStack",
				"olcDbShmKey",
				"olcDbCacheFree",
				"olcDbDNcacheSize",
				"olcDbPageSize"
			]
		},
		"olcConfig": {
			"oid": "1.3.6.1.4.1.4203.1.12.2.4.0.0",
			"name": [
				"olcConfig"
			],
			"parent": "top",
			"description": "",
			"type": "ABSTRACT",
			"must": null,
			"may": null
		},
		"olcDatabaseConfig": {
			"oid": "1.3.6.1.4.1.4203.1.12.2.4.0.4",
			"name": [
				"olcDatabaseConfig"
			],
			"parent": "olcConfig",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"olcDatabase"
			],
			"may": [
				"olcHidden",
				"olcSuffix",
				"olcSubordinate",
				"olcAccess",
				"olcAddContentAcl",
				"olcLastMod",
				"olcLimits",
				"olcMaxDerefDepth",
				"olcPlugin",
				"olcReadOnly",
				"olcReplica",
				"olcReplicaArgsFile",
				"olcReplicaPidFile",
				"olcReplicationInterval",
				"olcReplogFile",
				"olcRequires",
				"olcRestrict",
				"olcRootDN",
				"olcRootPW",
				"olcSchemaDN",
				"olcSecurity",
				"olcSizeLimit",
				"olcSyncUseSubentry",
				"olcSyncrepl",
				"olcTimeLimit",
				"olcUpdateDN",
				"olcUpdateRef",
				"olcMirrorMode",
				"olcMonitoring",
				"olcExtraAttrs"
			]
		},
		"olcFrontendConfig": {
			"oid": "1.3.6.1.4.1.4203.1.12.2.4.0.7",
			"name": [
				"olcFrontendConfig"
			],
			"parent": "",
			"description": "",
			"type": "AUXILIARY",
			"must": null,
			"may": [
				"olcDefaultSearchBase",
				"olcPasswordHash",
				"olcSortVals"
			]
		},
		"olcGlobal": {
			"oid": "1.3.6.1.4.1.4203.1.12.2.4.0.1",
			"name": [
				"olcGlobal"
			],
			"parent": "olcConfig",
			"description": "",
			"type": "STRUCTURAL",
			"must": null,
			"may": [
				"cn",
				"olcConfigFile",
				"olcConfigDir",
				"olcAllows",
				"olcArgsFile",
				"olcAttributeOptions",
				"olcAuthIDRewrite",
				"olcAuthzPolicy",
				"olcAuthzRegexp",
				"olcConcurrency",
				"olcConnMaxPending",
				"olcConnMaxPendingAuth",
				"olcDisallows",
				"olcGentleHUP",
				"olcIdleTimeout",
				"olcIndexSubstrIfMaxLen",
				"olcIndexSubstrIfMinLen",
				"olcIndexSubstrAnyLen",
				"olcIndexSubstrAnyStep",
				"olcIndexIntLen",
				"olcListenerThreads",
				"olcLocalSSF",
				"olcLogFile",
				"olcLogLevel",
				"olcPasswordCryptSaltFormat",
				"olcPasswordHash",
				"olcPidFile",
				"olcPluginLogFile",
				"olcReadOnly",
				"olcReferral",
				"olcReplogFile",
				"olcRequires",
				"olcRestrict",
				"olcReverseLookup",
				"olcRootDSE",
				"olcSaslAuxprops",
				"olcSaslHost",
				"olcSaslRealm",
				"olcSaslSecProps",
				"olcSecurity",
				"olcServerID",
				"olcSizeLimit",
				"olcSockbufMaxIncoming",
				"olcSockbufMaxIncomingAuth",
				"olcTCPBuffer",
				"olcThreads",
				"olcTimeLimit",
				"olcTLSCACertificateFile",
				"olcTLSCACertificatePath",
				"olcTLSCertificateFile",
				"olcTLSCertificateKeyFile",
				"olcTLSCipherSuite",
				"olcTLSCRLCheck",
				"olcTLSRandFile",
				"olcTLSVerifyClient",
				"olcTLSDHParamFile",
				"olcTLSECName",
				"olcTLSCRLFile",
				"olcTLSProtocolMin",
				"olcToolThreads",
				"olcWriteTimeout",
				"olcObjectIdentifier",
				"olcAttributeTypes",
				"olcObjectClasses",
				"olcDitContentRules",
				"olcLdapSyntaxes"
			]
		},
		"olcHdbConfig": {
			"oid": "1.3.6.1.4.1.4203.1.12.2.4.2.1.2",
			"name": [
				"olcHdbConfig"
			],
			"parent": "olcDatabaseConfig",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"olcDbDirectory"
			],
			"may": [
				"olcDbCacheSize",
				"olcDbCheckpoint",
				"olcDbChecksum",
				"olcDbConfig",
				"olcDbCryptFile",
				"olcDbCryptKey",
				"olcDbNoSync",
				"olcDbDirtyRead",
				"olcDbIDLcacheSize",
				"olcDbIndex",
				"olcDbLinearIndex",
				"olcDbLockDetect",
				"olcDbMode",
				"olcDbSearchStack",
				"olcDbShmKey",
				"olcDbCacheFree",
				"olcDbDNcacheSize",
				"olcDbPageSize"
			]
		},
		"olcIncludeFile": {
			"oid": "1.3.6.1.4.1.4203.1.12.2.4.0.6",
			"name": [
				"olcIncludeFile"
			],
			"parent": "olcConfig",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"olcInclude"
			],
			"may": [
				"cn",
				"olcRootDSE"
			]
		},
		"olcLdifConfig": {
			"oid": "1.3.6.1.4.1.4203.1.12.2.4.2.2.1",
			"name": [
				"olcLdifConfig"
			],
			"parent": "olcDatabaseConfig",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"olcDbDirectory"
			],
			"may": null
		},
		"olcMdbConfig": {
			"oid": "1.3.6.1.4.1.4203.1.12.2.4.2.12.1",
			"name": [
				"olcMdbConfig"
			],
			"parent": "olcDatabaseConfig",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"olcDbDirectory"
			],
			"may": [
				"olcDbCheckpoint",
				"olcDbEnvFlags",
				"olcDbNoSync",
				"olcDbIndex",
				"olcDbMaxReaders",
				"olcDbMaxSize",
				"olcDbMode",
				"olcDbSearchStack",
				"olcDbRtxnSize"
			]
		},
		"olcModuleList": {
			"oid": "1.3.6.1.4.1.4203.1.12.2.4.0.8",
			"name": [
				"olcModuleList"
			],
			"parent": "olcConfig",
			"description": "",
			"type": "STRUCTURAL",
			"must": null,
			"may": [
				"cn",
				"olcModulePath",
				"olcModuleLoad"
			]
		},
		"olcMonitorConfig": {
			"oid": "1.3.6.1.4.1.4203.1.12.2.4.2.4.1",
			"name": [
				"olcMonitorConfig"
			],
			"parent": "olcDatabaseConfig",
			"description": "",
			"type": "STRUCTURAL",
			"must": null,
			"may": null
		},
		"olcOverlayConfig": {
			"oid": "1.3.6.1.4.1.4203.1.12.2.4.0.5",
			"name": [
				"olcOverlayConfig"
			],
			"parent": "olcConfig",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"olcOverlay"
			],
			"may": null
		},
		"olcSchemaConfig": {
			"oid": "1.3.6.1.4.1.4203.1.12.2.4.0.2",
			"name": [
				"olcSchemaConfig"
			],
			"parent": "olcConfig",
			"description": "",
			"type": "STRUCTURAL",
			"must": null,
			"may": [
				"cn",
				"olcObjectIdentifier",
				"olcLdapSyntaxes",
				"olcAttributeTypes",
				"olcObjectClasses",
				"olcDitContentRules"
			]
		},
		"oncRpc": {
			"oid": "1.3.6.1.1.1.2.5",
			"name": [
				"oncRpc"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"cn",
				"oncRpcNumber",
				"description"
			],
			"may": [
				"description"
			]
		},
		"organization": {
			"oid": "2.5.6.4",
			"name": [
				"organization"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"o"
			],
			"may": [
				"userPassword",
				"searchGuide",
				"seeAlso",
				"businessCategory",
				"x121Address",
				"registeredAddress",
				"destinationIndicator",
				"preferredDeliveryMethod",
				"telexNumber",
				"teletexTerminalIdentifier",
				"telephoneNumber",
				"internationaliSDNNumber",
				"facsimileTelephoneNumber",
				"street",
				"postOfficeBox",
				"postalCode",
				"postalAddress",
				"physicalDeliveryOfficeName",
				"st",
				"l",
				"description"
			]
		},
		"organizationalPerson": {
			"oid": "2.5.6.7",
			"name": [
				"organizationalPerson"
			],
			"parent": "person",
			"description": "",
			"type": "STRUCTURAL",
			"must": null,
			"may": [
				"title",
				"x121Address",
				"registeredAddress",
				"destinationIndicator",
				"preferredDeliveryMethod",
				"telexNumber",
				"teletexTerminalIdentifier",
				"telephoneNumber",
				"internationaliSDNNumber",
				"facsimileTelephoneNumber",
				"street",
				"postOfficeBox",
				"postalCode",
				"postalAddress",
				"physicalDeliveryOfficeName",
				"ou",
				"st",
				"l"
			]
		},
		"organizationalRole": {
			"oid": "2.5.6.8",
			"name": [
				"organizationalRole"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"cn"
			],
			"may": [
				"x121Address",
				"registeredAddress",
				"destinationIndicator",
				"preferredDeliveryMethod",
				"telexNumber",
				"teletexTerminalIdentifier",
				"telephoneNumber",
				"internationaliSDNNumber",
				"facsimileTelephoneNumber",
				"seeAlso",
				"roleOccupant",
				"preferredDeliveryMethod",
				"street",
				"postOfficeBox",
				"postalCode",
				"postalAddress",
				"physicalDeliveryOfficeName",
				"ou",
				"st",
				"l",
				"description"
			]
		},
		"organizationalUnit": {
			"oid": "2.5.6.5",
			"name": [
				"organizationalUnit"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"ou"
			],
			"may": [
				"userPassword",
				"searchGuide",
				"seeAlso",
				"businessCategory",
				"x121Address",
				"registeredAddress",
				"destinationIndicator",
				"preferredDeliveryMethod",
				"telexNumber",
				"teletexTerminalIdentifier",
				"telephoneNumber",
				"internationaliSDNNumber",
				"facsimileTelephoneNumber",
				"street",
				"postOfficeBox",
				"postalCode",
				"postalAddress",
				"physicalDeliveryOfficeName",
				"st",
				"l",
				"description"
			]
		},
		"person": {
			"oid": "2.5.6.6",
			"name": [
				"person"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"sn",
				"cn"
			],
			"may": [
				"userPassword",
				"telephoneNumber",
				"seeAlso",
				"description"
			]
		},
		"pilotDSA": {
			"oid": "0.9.2342.19200300.100.4.21",
			"name": [
				"pilotDSA"
			],
			"parent": "dsa",
			"description": "",
			"type": "STRUCTURAL",
			"must": null,
			"may": [
				"dSAQuality"
			]
		},
		"pilotOrganization": {
			"oid": "0.9.2342.19200300.100.4.20",
			"name": [
				"pilotOrganization"
			],
			"parent": "",
			"description": "",
			"type": "STRUCTURAL",
			"must": null,
			"may": [
				"buildingName"
			]
		},
		"pilotPerson": {
			"oid": "0.9.2342.19200300.100.4.4",
			"name": [
				"pilotPerson",
				"newPilotPerson"
			],
			"parent": "person",
			"description": "",
			"type": "STRUCTURAL",
			"must": null,
			"may": [
				"userid",
				"textEncodedORAddress",
				"rfc822Mailbox",
				"favouriteDrink",
				"roomNumber",
				"userClass",
				"homeTelephoneNumber",
				"homePostalAddress",
				"secretary",
				"personalTitle",
				"preferredDeliveryMethod",
				"businessCategory",
				"janetMailbox",
				"otherMailbox",
				"mobileTelephoneNumber",
				"pagerTelephoneNumber",
				"organizationalStatus",
				"mailPreferenceOption",
				"personalSignature"
			]
		},
		"pkiCA": {
			"oid": "2.5.6.22",
			"name": [
				"pkiCA"
			],
			"parent": "top",
			"description": "",
			"type": "AUXILIARY",
			"must": null,
			"may": [
				"authorityRevocationList",
				"certificateRevocationList",
				"cACertificate",
				"crossCertificatePair"
			]
		},
		"pkiUser": {
			"oid": "2.5.6.21",
			"name": [
				"pkiUser"
			],
			"parent": "top",
			"description": "",
			"type": "AUXILIARY",
			"must": null,
			"may": [
				"userCertificate"
			]
		},
		"posixAccount": {
			"oid": "1.3.6.1.1.1.2.0",
			"name": [
				"posixAccount"
			],
			"parent": "top",
			"description": "",
			"type": "AUXILIARY",
			"must": [
				"cn",
				"uid",
				"uidNumber",
				"gidNumber",
				"homeDirectory"
			],
			"may": [
				"userPassword",
				"loginShell",
				"gecos",
				"description"
			]
		},
		"posixGroup": {
			"oid": "1.3.6.1.1.1.2.2",
			"name": [
				"posixGroup"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"cn",
				"gidNumber"
			],
			"may": [
				"userPassword",
				"memberUid",
				"description"
			]
		},
		"qualityLabelledData": {
			"oid": "0.9.2342.19200300.100.4.22",
			"name": [
				"qualityLabelledData"
			],
			"parent": "top",
			"description": "",
			"type": "AUXILIARY",
			"must": [
				"dsaQuality"
			],
			"may": [
				"subtreeMinimumQuality",
				"subtreeMaximumQuality"
			]
		},
		"referral": {
			"oid": "2.16.840.1.113730.3.2.6",
			"name": [
				"referral"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"ref"
			],
			"may": null
		},
		"residentialPerson": {
			"oid": "2.5.6.10",
			"name": [
				"residentialPerson"
			],
			"parent": "person",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"l"
			],
			"may": [
				"businessCategory",
				"x121Address",
				"registeredAddress",
				"destinationIndicator",
				"preferredDeliveryMethod",
				"telexNumber",
				"teletexTerminalIdentifier",
				"telephoneNumber",
				"internationaliSDNNumber",
				"facsimileTelephoneNumber",
				"preferredDeliveryMethod",
				"street",
				"postOfficeBox",
				"postalCode",
				"postalAddress",
				"physicalDeliveryOfficeName",
				"st",
				"l"
			]
		},
		"room": {
			"oid": "0.9.2342.19200300.100.4.7",
			"name": [
				"room"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"commonName"
			],
			"may": [
				"roomNumber",
				"description",
				"seeAlso",
				"telephoneNumber"
			]
		},
		"shadowAccount": {
			"oid": "1.3.6.1.1.1.2.1",
			"name": [
				"shadowAccount"
			],
			"parent": "top",
			"description": "",
			"type": "AUXILIARY",
			"must": [
				"uid"
			],
			"may": [
				"userPassword",
				"shadowLastChange",
				"shadowMin",
				"shadowMax",
				"shadowWarning",
				"shadowInactive",
				"shadowExpire",
				"shadowFlag",
				"description"
			]
		},
		"simpleSecurityObject": {
			"oid": "0.9.2342.19200300.100.4.19",
			"name": [
				"simpleSecurityObject"
			],
			"parent": "top",
			"description": "",
			"type": "AUXILIARY",
			"must": [
				"userPassword"
			],
			"may": null
		},
		"strongAuthenticationUser": {
			"oid": "2.5.6.15",
			"name": [
				"strongAuthenticationUser"
			],
			"parent": "top",
			"description": "",
			"type": "AUXILIARY",
			"must": [
				"userCertificate"
			],
			"may": null
		},
		"subentry": {
			"oid": "2.5.17.0",
			"name": [
				"subentry"
			],
			"parent": "top",
			"description": "",
			"type": "STRUCTURAL",
			"must": [
				"cn",
				"subtreeSpecification"
			],
			"may": null
		},
		"subschema": {
			"oid": "2.5.20.1",
			"name": [
				"subschema"
			],
			"parent": "",
			"description": "",
			"type": "AUXILIARY",
			"must": null,
			"may": [
				"dITStructureRules",
				"nameForms",
				"dITContentRules",
				"objectClasses",
				"attributeTypes",
				"matchingRules",
				"matchingRuleUse"
			]
		},
		"top": {
			"oid": "2.5.6.0",
			"name": [
				"top"
			],
			"parent": "",
			"description": "",
			"type": "ABSTRACT",
			"must": [
				"objectClass"
			],
			"may": null
		},
		"uidObject": {
			"oid": "1.3.6.1.1.3.1",
			"name": [
				"uidObject"
			],
			"parent": "top",
			"description": "",
			"type": "AUXILIARY",
			"must": [
				"uid"
			],
			"may": null
		},
		"userSecurityInformation": {
			"oid": "2.5.6.18",
			"name": [
				"userSecurityInformation"
			],
			"parent": "top",
			"description": "",
			"type": "AUXILIARY",
			"must": null,
			"may": [
				"supportedAlgorithms"
			]
		}
	}
}

export const treeNode:TreeDataNode[] = [
	{
		key:"dc=com",
		title:"cd=com",
		children: [
			{
				key:"dc=example",
				title:"dc=example",
				children: [
					{
						key:"ou=group",
						title:"ou=group",
						children:[
							
						]
					},
					{
						key:"ou=person",
						title:"ou=person",
						children: [
							{
								key:"uid=john",
								title:"uid=john",
								children:[]
							},
							{
								key:"cn=mike",
								title:"cn=mike",
								children:[]
							}
						]
					},
					{
						key:"ou=HR",
						title:"out=HR",
						children:[]
					}
				]
			}
		]
	}
]