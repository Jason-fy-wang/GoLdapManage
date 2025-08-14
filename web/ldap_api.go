package web

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"com.ldap/management/ldap"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

type Router struct {
	Engine *gin.Engine
	Ldap   *ldap.LDAPOperation
	SecurityKey []byte
}

func NewRouter() *Router {
	engine := gin.New()
	engine.SetTrustedProxies(nil)
	return &Router{
		Engine: engine,
		SecurityKey: []byte("your_secret_key"),
	}
}

func (r *Router) Login(c *gin.Context) {
	username := c.Request.FormValue("username")
	password := c.Request.FormValue("password")
	lhost := c.Request.FormValue("lhost")
	lportStr := c.Request.FormValue("lport")
	lport, err := strconv.Atoi(lportStr)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid port number"})
		return
	}
	if username == "" || password == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Username and password are required"})
		return
	}
	r.Ldap, _ = ldap.NewLDAPOperation("", "", lhost, lport)
	if username == "admin" {
		r.Ldap.User = "cn=admin,dc=example,dc=com"
	}else {
		r.Ldap.User = fmt.Sprint("uid=", username, ",ou=person.dc=example,dc=com")
	}

	r.Ldap.Pwd = password
	if err := r.Ldap.Connect(); err != nil {
		log.Println("Failed to connect to LDAP server:", err)
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}
	err = r.Ldap.Authenicate()
	if err != nil {
		log.Println("Authentication failed:", err)
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(7*24 * time.Hour).Unix(),
	})
	tokenString, err := token.SignedString(r.SecurityKey)
	if err != nil {
		log.Println("Failed to sign token:", err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Login successful","token": tokenString})
}

func (r *Router) AuthRequire() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		rpath := c.Request.URL.Path
		if rpath == "/api/v1/login" {
			c.Next()
			return
		}

		if tokenString == "" || r.Ldap.User == "" || r.Ldap.Pwd == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
			return
		}

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return r.SecurityKey, nil
		})

		if err != nil || !token.Valid {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			return
		}

		c.Next()
	}
}

func (r *Router) SetupRouter() {
	groupRoute := r.Engine.Group("/api/v1")
	groupRoute.Use(r.AuthRequire())
	// Define your routes here
	groupRoute.GET("/", func(c *gin.Context) {
		c.String(200, "Welcome to the LDAP Management Web Interface")
	})

	// search all
	groupRoute.GET("/ldap/all", func(c *gin.Context) {
		if r.Ldap == nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "LDAP connection is not established"})
			return
		}
		baseDN := "dc=example,dc=com"
		filter := "(objectClass=*)"

		entries, err := r.Ldap.Search(baseDN, filter)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		if len(entries) == 0 {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": "No entries found"})
			return
		}

		c.JSON(http.StatusOK, entries)
	})

	// login
	groupRoute.POST("/login", r.Login)

	// search with specific filter

	// search account attributes

	// add account

	// delete account

	// update account
}

func (r *Router) StartWebServer(port int) {
	r.SetupRouter()
	r.Engine.Run("0.0.0.0:" + strconv.Itoa(port))
}
