package cmd

import (
	"com.ldap/management/web"
	cli "github.com/urfave/cli/v2"
)

var WebCommand = &cli.Command{
	Name:  "start",
	Usage: "Start the web server",
	Flags: []cli.Flag{},
	Action: func(c *cli.Context) error {
		web.StartWebServer()
		return nil
	},
}
