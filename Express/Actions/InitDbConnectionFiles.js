import path from "path"
import fs from "fs/promises"
import { MongooseConnectionFile } from "./code/mongoose-connection-file.code.js";
import { EnvFileCode } from "./code/env-file.code.js";
export async function InitializeDbConnectionFiles(DirPath,Db) {
let{type,isDbConnection,uri} =Db
const envPath = path.join(DirPath,".env")
const PackageFilePath = path.join(DirPath,"db.js");
try{
await fs.writeFile(envPath,EnvFileCode(isDbConnection,uri),"utf8")
if(type == "mongo") await fs.writeFile(PackageFilePath,MongooseConnectionFile(),"utf-8",)
} catch (err) {
    console.error(err);
    await fs.promises.rm(DirPath,{force:true,recursive:true})
    console.error(`Error initializing your app.`);
}   
}