import path from "path"
import fs from "fs/promises"
import { GitIgnoreFileCode } from "../code/git-ignore.code.js"
import { EnvFileCode } from "../code/env-file.code.js"
export const InitDirs = async(DirPath,Db) => {
try{
    let {isDbConnection,uri}= Db
    const GitIgnorePath = path.join(DirPath,".gitignore")
    const ReadMePath = path.join(DirPath,".README.md")
    const envPath = path.join(DirPath,".env")
    const Folders = ["src/routes","src/utils","views","tests","src/controllers","src/middlewares","src/models","public"]
    const Dirs = Folders.map(f=>path.join(DirPath,f))
    await fs.writeFile(GitIgnorePath,GitIgnoreFileCode(),"utf8") // ? .gitignore
    await fs.writeFile(ReadMePath,"## MY APP ","utf8") // ? Readme.md
    await fs.writeFile(envPath,EnvFileCode(isDbConnection,uri),"utf8") // ? .env
    for(let dir of Dirs){
        await fs.mkdir(dir,{recursive:true})
    }

}
catch(err){
    console.error(err);
    await fs.rm(DirPath,{force:true,recursive:true})
    console.error(`Error initializing your app.`);
}

}
