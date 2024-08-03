 export function EnvFileCode(isDbConnection,dbUri) {
    return `${isDbConnection?`db=${dbUri}`:``}`
}
