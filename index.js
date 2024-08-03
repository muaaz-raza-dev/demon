#!/usr/bin/env node 
//? The above line is called shebang , tells us which interpretor would use to execute the script.


import { program } from "commander";
import { MainPrompts } from "./prompt.js";
program.version("1.0.0").description("Demon - Quick start your server within cli.");
program.action(() => {
MainPrompts()
});

program.parse(process.argv);