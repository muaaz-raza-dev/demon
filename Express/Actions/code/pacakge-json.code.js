export function PackageJsonFileCode(Packages) {
    return  (`
    {
  "name": "",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js"
  },
  "author": "",
  "license": "",
  "dependencies": ${Packages}
}

    `);
    
    
    }
        