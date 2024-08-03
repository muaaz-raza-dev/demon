import fs from "fs"
import path from "path";
import { PackageJsonFileCode } from "./code/pacakge-json.code.js";
const InitializePackageFiles = async(DirPath,lib,isCors,Db) => {
const PackageFilePath = path.join(DirPath,"package.json");
let{type,isDbConnection} =Db

let orms= {"mongo":{"mongoose":"","mongo":"",}}

let Packages = {[lib]:"","dotenv":"",...(isCors?{cors:""}:{}) ,
 ...(isDbConnection?orms[type]:{} )};


try {
    await Promise.all(Object.keys(Packages).map(async(type)=>{
    let latestVersion = await getLatestVersion(type);
    Packages[type] = latestVersion;
    }))
await fs.promises.writeFile(PackageFilePath, PackageJsonFileCode(JSON.stringify(Packages)),"utf8");
} catch (err) {
await fs.promises.rm(DirPath,{force:true,recursive:true})
console.error(`Error initializing your app.`,err);
}
}
async function getLatestVersion(packageName) {
    const response = await fetch(`https://registry.npmjs.org/${packageName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch package info: ${response.statusText}`);
    }
    const packageInfo = await response.json();
    return "^"+packageInfo['dist-tags'].latest;
  }

export default InitializePackageFiles