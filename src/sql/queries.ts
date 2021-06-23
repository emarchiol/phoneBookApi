require("dotenv").config();
import { Client, QueryResult } from "pg";
import { Contact } from "../interfaces/contact";

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT as string),
});

export async function getAllPhoneBooks(): Promise<Contact[]> {
    try {
        await client.connect();
        const result: QueryResult<Contact> = await client.query("SELECT * FROM contacts");
        return result.rows;
    } catch (err) {
        console.log("ERRORRRR: ", err)
    } finally {
        client.end();
    }
    return [];
}
