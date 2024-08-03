import path from "path"
import fs from "fs/promises"
import { GitIgnoreFileCode } from "./code/git-ignore.code.js"
export const InitMainDirsNFiles = async(DirPath) => {
try{

    const GitIgnorePath = path.join(DirPath,".gitignore")
    const ReadMePath = path.join(DirPath,".README.md")
    const Folders = ["routes","utils","views","controllers","middlewares","models","public"]
    const Dirs = Folders.map(f=>path.join(DirPath,f))
    await fs.writeFile(GitIgnorePath,GitIgnoreFileCode(),"utf8")
    await fs.writeFile(ReadMePath,"## MY APP ","utf8")
    for(let dir of Dirs){
        await fs.mkdir(dir,{recursive:true})
    }
}
catch(err){
    console.error(err);
    await fs.promises.rm(DirPath,{force:true,recursive:true})
    console.error(`Error initializing your app.`);
}

}
