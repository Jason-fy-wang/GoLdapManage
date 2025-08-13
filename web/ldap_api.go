package web

import (
	"strconv"

	"com.ldap/management/ldap"
	"github.com/gin-gonic/gin"
)

type Router struct {
	Engine *gin.Engine
	Ldap   *ldap.LDAPOperation
}

func NewRouter() *Router {
	return &Router{
		Engine: gin.Default(),
	}
}

func (route *Router) SetupRouter() {
	groupRoute := route.Engine.Group("/api/v1")
	// Define your routes here
	groupRoute.GET("/", func(c *gin.Context) {
		c.String(200, "Welcome to the LDAP Management Web Interface")
	})

	// search all
	groupRoute.GET("/ldap/all", func(c *gin.Context) {
		if route.Ldap == nil {
			c.JSON(500, gin.H{"error": "LDAP connection is not established"})
			return
		}

		baseDN := "dc=example,dc=com"
		filter := "(objectClass=*)"

		entries, err := route.Ldap.Search(baseDN, filter)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		if len(entries) == 0 {
			c.JSON(404, gin.H{"message": "No entries found"})
			return
		}

		c.JSON(200, entries)
	})

	// search with specific filter

	// search account attributes

	// add account

	// delete account

	// update account
}

func (route *Router) StartWebServer(port int, ldap *ldap.LDAPOperation) {
	route.Ldap = ldap
	route.SetupRouter()
	route.Engine.Run("0.0.0.0:" + strconv.Itoa(port))
}
