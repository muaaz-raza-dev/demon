// Import the Express module
export function PackageJsonFileCode(Packages) {
    return  (`
    {
  "name": "",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "",
  "license": "",
  "dependencies": ${Packages}
}

    `);
    
    
    }
        