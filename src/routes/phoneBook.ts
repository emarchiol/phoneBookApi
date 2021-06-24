import { Contact } from "../interfaces/contact";
import { getAllContacts, deleteContactById, addOrUpdateContact } from "../sql/contacts-db";

// Get
export async function list(req: any, res: any): Promise<any[]> {
    try {
        const contacts: Contact[] = await getAllContacts();
        return res.status(200).json(contacts);
    }
    catch(err) {
        return res.status(500).json({error: "Error while retrieving data"});
    }
};

// Post
export async function addOrUpdate(req: any, res: any): Promise<any[]> {
    const record: number = await addOrUpdateContact(req.body, req.params);
    
    return record > 0 ? res.status(200) : 
    res.status(404).json({error: "data not found"});
};

// Post
export async function updateById(req: any, res: any): Promise<any[]> {
    const contacts: Contact[] = await getAllContacts();
    console.log("contacts from db:", contacts);
    return contacts ? res.status(200).json(contacts) : 
    res.status(404).json({error: "data not found"});
};

// Delete
export async function deleteById(req: any, res: any): Promise<any[]> {
    try {
        await deleteContactById(req.params.id);
        return res.status(200);
    }
    catch(err) {
        return res.status(500).json({error: "Error while deleting record"});
    }
};
