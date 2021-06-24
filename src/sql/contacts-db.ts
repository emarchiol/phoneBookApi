require("dotenv").config();
import { Pool, QueryResult } from "pg";
import { Contact } from "../interfaces/contact";
import {selectContactQuery, deleteContactQuery, insertContactQuery, updateContactQuery} from "./sql-queries";

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT as string),
});

export async function getAllContacts(): Promise<Contact[]> {
    try {
        const result: QueryResult<Contact> = await pool.query(selectContactQuery);
        return result.rows;
    } catch (err) {
        throw (err);
    }
}

export async function deleteContactById(id: number): Promise<number> {
    try {
        const res = await pool.query(deleteContactQuery, [id]);
        return res.rows.length;
    } catch (err) {
        throw (err);
    }
}

export async function addOrUpdateContact(contact: Contact, id?: number): Promise<number> {
    try {
        return id ? updateContact(contact) : addContact(contact);
    } catch (err) {
        throw (err);
    }
}

async function addContact(newContact: Contact): Promise<number> {
    const queryValues: string[] = Object.values(newContact);
    const res = await pool.query(insertContactQuery, queryValues);
    return res.rows.length;
}

async function updateContact(existingContact: Contact): Promise<number> {
    const queryValues: string[] = Object.values(existingContact);
    const res = await pool.query(updateContactQuery, queryValues);
    return res.rows.length
}
