import express from "express";
import { AddressInfo } from "net";
import { list } from "./routes/phoneBook";

const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

const serverPort: number = 8081;

app.get("/contacts", list);

const server = app.listen(serverPort, "127.0.0.1", function () {
    const host: string = (server.address() as AddressInfo).address;
    const port: number = (server.address() as AddressInfo).port;
    console.log("Phone book rest API listening at http://%s:%s", host, port);
});
