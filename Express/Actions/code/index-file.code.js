// Import the Express module
export function IndexFileCode(Port,isCors,isDbConnection) {
return  (`
require('dotenv').config()
const express = require('express');
const cors = require('cors');
${isDbConnection?"const {dbConnection} = require('./db.js')":""}

const app = express();
const PORT = process.env.PORT || ${Port};

app.use(express.json())
${isCors ? `app.use(cors({ origin: "*", credentials: true }));` : ``}


// Route for the home page
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

${isDbConnection?
`
//Connecting to db
dbConnection()`
:""}

// Start the server
app.listen(PORT, () => {
  console.log(\`Server is running on http://localhost:\${PORT}\`);
});
`);


}
    