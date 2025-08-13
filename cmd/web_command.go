package cmd

import (
	"com.ldap/management/ldap"
	"com.ldap/management/web"
	cli "github.com/urfave/cli/v2"
)

var WebCommand = &cli.Command{
	Name:  "start",
	Usage: "Start the web server",
	Flags: []cli.Flag{
		&cli.StringFlag{
			Name:    "lhost",
			Aliases: []string{"H"},
			Usage:   "ldap server host",
			Value:   "",
		},
		&cli.IntFlag{
			Name:    "lport",
			Aliases: []string{"P"},
			Usage:   "ldap port ",
			Value:   389,
		},
		&cli.IntFlag{
			Name:    "port",
			Aliases: []string{""},
			Usage:   "Web server port",
			Value:   8080,
		},
	},
	Action: func(c *cli.Context) error {
		lhost := c.String("lhost")
		lport := c.Int("lport")
		port := c.Int("port")
		ldapOpera, err := ldap.NewLDAPOperation(lhost, lport)
		if err != nil {
			return err
		}
		route := web.NewRouter()
		route.StartWebServer(port, ldapOpera)
		return nil
	},
}
