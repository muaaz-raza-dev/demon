import fs from "fs"
import path from "path";
import { IndexFileCode } from "../code/index-file.code.js";
import InitializePackageFiles from "./InitPackageFile.js";
import { InitializeDbConnectionFiles } from "./InitDbConnectionFiles.js";
const InitializeMainFiles = async(DirPath,lib,port,isCors,Db) => {
let {isDbConnection} =Db
const MainFilePath = path.join(DirPath,"src/index.js")
const SourceDir = path.join(DirPath,"src")
try {
await fs.promises.mkdir(SourceDir) // creating src folder
await fs.promises.writeFile(MainFilePath, IndexFileCode(port,isCors,isDbConnection),"utf8"); //creating index file
await InitializePackageFiles(DirPath,lib,isCors,Db)
if(isDbConnection) await InitializeDbConnectionFiles(DirPath,Db)
} catch (err) {
    console.error(err);
    await fs.promises.rm(DirPath,{force:true,recursive:true})
    console.error(`Error initializing your app.`);
}
}

export default InitializeMainFiles