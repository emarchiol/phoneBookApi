import express from "express";
import { AddressInfo } from "net";
import { list, addOrUpdate, deleteById } from "./routes/phoneBook";

const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

const serverPort: number = 8081;

app.get("/contacts", list);
app.post("/contacts", addOrUpdate);
app.post("/contacts/:id", addOrUpdate);
app.delete("/contacts/:id", deleteById);

const server = app.listen(serverPort, "127.0.0.1", function () {
    const host: string = (server.address() as AddressInfo).address;
    const port: number = (server.address() as AddressInfo).port;
    console.log("Phone book rest API listening at http://%s:%s", host, port);
});
