import path from "path"
import fs from "fs"
import InitializeMainFiles from "./Actions/Setups/InitMainFiles.js";
import { PrintResult } from "./PrintResult.js";
import { InitDirs } from "./Actions/Setups/InitDirs.js";
import ora from "ora";
const spinner = ora("Setting up your application")
export async function SetupExpressApp(appName,port,isCors,Db) {
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
        await InitDirs(FolderPath,Db)

        spinner.succeed("Directory configured")
        
        PrintResult(appName)
        spinner.succeed("Setup completed successfully")
} catch (err) {
        console.log(err)
        spinner.fail("Error lanuching you app.")
        await fs.promises.rm(FolderPath,{force:true,recursive:true})
        if (err.code === 'EEXIST') {
            console.error(`Folder "${appName}" already exists.`);
        } else {
            console.error(`Error creating folder "${appName}":`);
        }
    }
}