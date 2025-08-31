package web

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"com.ldap/management/ldap"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	log "github.com/sirupsen/logrus"
)

type Router struct {
	Engine *gin.Engine
	Ldap   ldap.LdapOperation
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
	r.Ldap, _ = ldap.NewLDAPOperation(username, password, lhost, lport)

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
	// retrieve all schema
	go r.Ldap.GetObjectClassAttributes()
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

		if tokenString == "" || r.Ldap == nil{
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
			return
		}

		ldop := r.Ldap.(*ldap.LDAPOperation)
		if ldop.User == "" || ldop.Pwd == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid information, please re-login."})
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

func (r *Router) Recovery() gin.HandlerFunc {
	return func(c *gin.Context){
		defer func() {
			if rec := recover(); rec != nil {
				log.Errorln("recovery..", rec)
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "internal abnormal."})
			}
		}()
		c.Next()
	}
}

func (r *Router) Add(c *gin.Context) {
	var body map[string]string
	
	if err := c.ShouldBindBodyWithJSON(&body); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	log.Println("receive msg: ", body)
	if err := r.Ldap.AddRecord(body); err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message":err.Error()})
	}

	c.JSON(http.StatusCreated, gin.H{"message":"success"})
}

func (r *Router) Delete(c *gin.Context) {
	dn := c.Query("dn")
	log.Info("going to delete ", dn)
	if len(dn) <= 0{
		c.AbortWithStatusJSON(http.StatusBadRequest,gin.H{"message":"please input which dn to delete"})
		return
	}
	
	if err := r.Ldap.DeleteRecord(dn); err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message":err.Error()})
	}

	c.JSON(http.StatusAccepted, gin.H{"message":"success"})
}

func (r *Router) setupCors() {
	config := cors.Config{
		//AllowAllOrigins: true,
		AllowOrigins: []string{"http://localhost:5173","http://192.168.20.21:5173","http://*:5173"},
		AllowCredentials: true,
		AllowMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		MaxAge: 12 * time.Hour,

	}
	r.Engine.Use(cors.New(config))
}

func (r *Router) SetupRouter() {
	r.Engine.Use(r.Recovery())
	r.setupCors()
	groupRoute := r.Engine.Group("/api/v1")
	{
		groupRoute.Use(r.AuthRequire())
		// Define your routes here
		groupRoute.GET("/", func(c *gin.Context) {
			c.String(200, "Welcome to the LDAP Management Web Interface")
		})

		// search all
		groupRoute.GET("/ldap/all", r.SearchAllEntry)

		// login
		groupRoute.POST("/login", r.Login)
		
		// search account attributes
		groupRoute.GET("/ldap/dn", r.SearchEntryAttribute)
		
		// get all schema
		groupRoute.GET("/schema", func (c *gin.Context)  {
			operation := r.Ldap.(*ldap.LDAPOperation)

			c.JSON(http.StatusOK, gin.H{"schemas":operation.ObjParser.Objects})
		})
		// add account
		groupRoute.POST("/ldap/add", r.Add)

		// delete account
		groupRoute.DELETE("/ldap/del", r.Delete)
		// update account
	}
}

func (r *Router) SearchEntryAttribute(c *gin.Context) {
	dn,exist := c.GetQuery("dn")
	if !exist {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"msg": "please give dn paramter"})
		return
	}
	attrs, err := r.Ldap.GetAttrOfObjectClass(dn)
	if err != nil {
		log.Errorf("get attribute errors: %v", err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
	}
	c.JSON(http.StatusOK, attrs)
}

func (r *Router) SearchAllEntry(c *gin.Context) {
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
}

func (r *Router) StartWebServer(port int) {
	r.SetupRouter()
	r.Engine.Run("0.0.0.0:" + strconv.Itoa(port))
}
