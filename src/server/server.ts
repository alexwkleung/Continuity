import express from 'express'
import route from './routes/route.js'

//create express app
const app = express();

//set port 
const PORT = 3000;

//listen on port
app.listen(PORT, (): void => {
    console.log("Listening on port " + PORT + ". Press Ctrl-C to exit.");
});

//serve route
app.use('/', route);