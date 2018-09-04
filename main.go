package main

import (
    "fmt"
    "config"
)

func main() {
    config.DecodeAllConfig("/Users/limengjie/Documents/tools/xlsx/configOut/")
    fmt.Println(config.GetRoleById(1).Ai)
}