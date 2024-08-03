import chalk from "chalk";

export function PrintResult(appName){
        
    console.log(); //blank line
        
    console.log(`
cd ${appName} 
npm install 
npm start
        `);

    console.log(); //blank line

    
    console.log(chalk.green(` Your server files initialized , successfully !`));

    console.log(); //blank line
}