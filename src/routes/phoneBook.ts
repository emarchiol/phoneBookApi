import { Contact } from "../interfaces/contact";
import { getAllContacts, deleteContactById, addOrUpdateContact } from "../sql/contacts-db";

// Get
export async function list(req: any, res: any): Promise<Contact[]> {
    try {
        const contacts: Contact[] = await getAllContacts();
        return res.status(200).json(contacts);
    }
    catch (err) {
        return res.status(500).json({ error: "Error while retrieving data" });
    }
};

// Post
export async function addOrUpdate(req: any, res: any): Promise<any> {
    try {
        const record: number = await addOrUpdateContact(req.body, req.params);

        return record > 0 ? res.status(200) :
            res.status(409).json({ error: "Conflict when adding or updating new contact" });
    } catch (err) {
        return res.status(500).json({ error: "Error while retrieving data" });
    }
};

// Delete
export async function deleteById(req: any, res: any): Promise<any> {
    try {
        const record: number = await deleteContactById(req.params.id);
        return record > 0 ? res.status(200) : res.status(204);
    }
    catch (err) {
        return res.status(500).json({ error: "Error while deleting record" });
    }
};
