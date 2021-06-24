jest.mock("../sql/contacts-db", () => ({
    getAllContacts: jest.fn(() => [])
}));
import { getAllContacts } from "../sql/contacts-db";
import { list } from "./phoneBook";

describe("phone book routes", () => {
    describe("list", () => {
        let requestMock: any;
        let responseMock: any;

        beforeEach(() => {
            requestMock = {};
            responseMock = {
                viewName: "",
                data: {},
                status: (status: number) => {
                    return {
                        json: (value: any) => { return value }
                    }
                }
            };
        });
        it("should call getAllContacts", async () => {
            const result = await list(requestMock, responseMock);

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
});
