import { Contact } from "../interfaces/contact";
import { getAllPhoneBooks } from "../sql/queries";

// Get
export async function list(req: any, res: any): Promise<any[]> {
    const contacts: Contact[] = await getAllPhoneBooks();
    console.log("contacts from db:", contacts);
    return contacts ? res.status(200).json(contacts) : 
    res.status(404).json({error: "data not found"});
};
