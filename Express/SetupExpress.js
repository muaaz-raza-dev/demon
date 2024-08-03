import path from "path"
import fs from "fs"
import InitializeMainFiles from "./Actions/InitMainFiles.js";
import { PrintResult } from "./PrintResult.js";
import { InitMainDirsNFiles } from "./Actions/InitMainDirnFiles.js";
import ora from "ora";
export async function SetupExpressApp(appName,port,isCors,Db) {
    const spinner = ora("Setting up your application").start()
    const currentDirectory = process.cwd()
    const FolderPath =path.join(currentDirectory, appName)

    try {
        spinner.start("Settin up folder")
        await fs.promises.mkdir(FolderPath);
        spinner.succeed("Folder is created")
        spinner.start("Setting up main files")

        await InitializeMainFiles(FolderPath,"express",port,isCors,Db) 

        spinner.succeed("Main files configured")
        spinner.start("Setting up standard express directory")
        await InitMainDirsNFiles(FolderPath)

        spinner.succeed("Directory configured")
        
        PrintResult(appName)
        spinner.succeed("Setup completed successfully")
} catch (err) {
        console.log(err)
        await fs.promises.rm(FolderPath,{force:true,recursive:true})
        if (err.code === 'EEXIST') {
            console.error(`Folder "${appName}" already exists.`);
        } else {
            console.error(`Error creating folder "${appName}":`);
        }
    }
}