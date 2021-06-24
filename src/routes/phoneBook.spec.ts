jest.mock("../sql/contacts-db", () => ({
    getAllContacts: jest.fn(() => []),
    addOrUpdateContact: jest.fn(() => []),
    deleteContactById: jest.fn(()=>{})
}));
import { getAllContacts, addOrUpdateContact, deleteContactById } from "../sql/contacts-db";
import { list, addOrUpdate, deleteById } from "./phoneBook";

describe("phone book routes", () => {
    let requestMock: any;
    let responseMock: any;

    beforeEach(() => {
        requestMock = {};
        responseMock = {
            viewName: "",
            data: {},
            status: (status: number) => {
                return {
                    code: status,
                    json: (value: any) => { return value }
                }
            }
        };
    });

    describe("list", () => {

        it("should call getAllContacts", async () => {
            await list(requestMock, responseMock);

            expect(getAllContacts).toHaveBeenCalledTimes(1);
        });

        it("should return values from getAllContacts", async () => {
            (getAllContacts as jest.Mock).mockImplementation(() => Promise.resolve([{
                "name": "123"
            }, {
                "name": "456"
            }]));
            const result = await list(requestMock, responseMock);

            expect(result.length).toEqual(2);
            expect(result).toEqual([{
                name: "123"
            },
            {
                name: "456"
            }])
        });

        it("should return 500 if getAllContacts throws an errorr", async () => {
            (getAllContacts as jest.Mock).mockImplementation(() => {throw("Invalid username and password for db")});
            const result = await list(requestMock, responseMock);

            expect(result).toEqual({ error: "Error while retrieving data" });
        });
    });

    describe("addOrUpdate", () => {
        it("should call addOrUpdateContact", async () => {
            await addOrUpdate(requestMock, responseMock);

            expect(addOrUpdateContact).toHaveBeenCalledTimes(1);
        });

        it("should return 200 if the amount of affected rows is > 0 from addOrUpdate", async () => {
            (addOrUpdateContact as jest.Mock).mockImplementation(() => Promise.resolve(1));
            const result = await addOrUpdate(requestMock, responseMock);

            expect(result.code).toEqual(200);
        });

        it("should return an error if the amount of affected rows is equal 0 from addOrUpdate", async () => {
            (addOrUpdateContact as jest.Mock).mockImplementation(() => Promise.resolve(0));
            const result = await addOrUpdate(requestMock, responseMock);

            expect(result).toEqual({ error: "Conflict when adding or updating new contact" });
        });

        it("should return 500 if addOrUpdateContact throws an errorr", async () => {
            (addOrUpdateContact as jest.Mock).mockImplementation(() => {throw("Invalid username and password for db")});
            const result = await addOrUpdate(requestMock, responseMock);

            expect(result).toEqual({ error: "Error while retrieving data" });
        });
    });

    describe("deleteById", () => {
        beforeEach(()=>{
            requestMock = {params: {id: 1}};
        })
        it("should call deleteContactById", async () => {
            await deleteById(requestMock, responseMock);
            
            expect(deleteContactById).toHaveBeenCalledTimes(1);
        });

        it("should return 200 if the amount of affected rows is > 0 from deleteById", async () => {
            (deleteContactById as jest.Mock).mockImplementation(() => Promise.resolve(1));
            const result = await deleteById(requestMock, responseMock);

            expect(result.code).toEqual(200);
        });

        it("should return 204 if the amount of affected rows is = 0 from deleteById", async () => {
            (deleteContactById as jest.Mock).mockImplementation(() => Promise.resolve(0));
            const result = await deleteById(requestMock, responseMock);

            expect(result.code).toEqual(204);
        });

        it("should return 500 if deleteContactById throws an errorr", async () => {
            (deleteContactById as jest.Mock).mockImplementation(() => {throw("Invalid username and password for db")});
            const result = await deleteById(requestMock, responseMock);

            expect(result).toEqual({ error: "Error while deleting record" });
        });
    });
});
