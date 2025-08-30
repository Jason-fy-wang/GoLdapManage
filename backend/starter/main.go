package main

import (
	"os"

	"com.ldap/management/cmd"
	cli "github.com/urfave/cli/v2"
)

func main() {
	app := cli.NewApp()
	app.Commands = []*cli.Command{
		cmd.WebCommand,
	}

	err := app.Run(os.Args)
	if err != nil {
		os.Exit(1)
	}
}
