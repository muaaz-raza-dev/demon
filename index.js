#!/usr/bin/env node 
//? The above line is called shebang , tells us which interpretor would use to execute the script.


import { program } from "commander";
import inquirer from "inquirer";
import { SetupExpressApp } from "./Express/SetupExpress.js";
program.version("1.0.0").description("My Node CLI");
program.action(() => {
inquirer
    .prompt([
    
      {type:"select",
        name: "node-framework",
        message: "Choose your preferred node.js framework .",
        choices:[{
          value: "express",
          name: "Express"
        }
      ]
      },
      {
        type: "input",
        name: "app-name",
        default:"nasa-server",
        message: "What's your app Name?"
      },
      {type:"number",
        name:"port",
        message: "What's your app port?",
        default:3000
      },
      {type:"confirm",
        name:"include-cors",
        default:true,
        message: "Do you want to include default cors configurations?"
      },
    {type:"confirm",name:"isDbConnection",message:"Would you like to include default database connection configuration settings?",default:true},

    {type:"select",
      name:"db",
      message: "Choose your preferred database .",
      when:(answers)=>answers.isDbConnection,
      choices:[{
        value: "mongo",
        name: "MongoDB (mongoose)",
        message: "Include mongoose",
 },
 ],
},
{
  type:"input",
  name:"db-uri",
  message:"Enter your database URI ",
  default:"mongodb://127.0.0.1:27017/",
  when:(answers)=>answers.db == "mongo",
 },

  ]
)
    .then(async(answers) => {
      let {"app-name":name,port,'include-cors':isCors,db,isDbConnection,"db-uri":dbUri,"node-framework":type} =answers
      let Db = {type:db,isDbConnection,uri:dbUri}
      if(type == "express"){ await SetupExpressApp(name,port,isCors,Db)}

      }).catch(err=>{console.log("Exited")}) ;
});

program.parse(process.argv);