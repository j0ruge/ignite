import express, { request, response } from 'express';

const app = express();


app.get("/", (request, response) => {
  console.log({message: "Hello World"});
})

app.listen(3333, () => console.log("Server is running!"));