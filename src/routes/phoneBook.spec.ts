
import {list} from "./phoneBook";

describe("pizza routes", () => {
    describe("get", ()=>{
        let requestMock: any;
        let responseMock: any;

        beforeEach(()=>{
            requestMock = {};
            responseMock = {
                viewName: "",
                data : {},
                status: ()=>{
                    return {json: ()=>{
                        return [1,2,3,4]
                    }}
                }
            };
        });
        it("should retrieve a list of all phone books", () => {
            expect(list(requestMock, responseMock).length).toEqual(0);
        });
    });
});