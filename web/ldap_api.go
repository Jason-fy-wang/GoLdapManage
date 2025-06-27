package web

import (
	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {
	router := gin.Default()

	return router
}
func SetupRouter(router *gin.Engine) *gin.Engine {

	// Define your routes here
	router.GET("/", func(c *gin.Context) {
		c.String(200, "Welcome to the LDAP Management Web Interface")
	})

	return router
}

func StartWebServer() {
	router := SetupRoutes()
	router = SetupRouter(router)

	router.Run(":8080")
}
