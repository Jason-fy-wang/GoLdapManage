package cmd

import (
	"com.ldap/management/web"
	cli "github.com/urfave/cli/v2"
)

var WebCommand = &cli.Command{
	Name:  "start",
	Usage: "Start the web server",
	Flags: []cli.Flag{
		&cli.IntFlag{
			Name:    "port",
			Aliases: []string{""},
			Usage:   "Web server port",
			Value:   8080,
		},
	},
	Action: func(c *cli.Context) error {
		port := c.Int("port")
		route := web.NewRouter()
		route.StartWebServer(port)
		return nil
	},
}
