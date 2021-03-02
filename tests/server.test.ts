const server = require("../src/server.ts");
const qrEncoder = require("../src/qrCodeEncoder.ts");

jest.mock("../src/qrCodeEncoder.ts");
const mockedEncoder = qrEncoder.encodeStringToQrCode.mockResolvedValue("EncodedValue");
const testString = "Doge";

const send = jest.fn();
const responseMockWithStatus = {
    statusCode: 0,
    status: function status(code) {
        this.statusCode = code;
        return this;
    },
    send: send,
};

describe("Server tests", () => {
    test("When mainHandler called with param then calls encoder with param", () => {
        const reqMock = { query: { text: testString } };
        const resMock = { render: jest.fn() };

        server.mainHandler(reqMock, resMock);

        expect(mockedEncoder).lastCalledWith(testString);
    });

    test("When mainHandler called with empty string then calls encoder with default value", () => {
        const reqMock = {};
        const resMock = { render: jest.fn() };

        server.mainHandler(reqMock, resMock);

        expect(mockedEncoder).lastCalledWith("Hello");
    });

    test("When getHandler called with incorrect request then responses with error 400", () => {
        const reqMock = {};

        server.getHandler(reqMock, responseMockWithStatus);

        expect(responseMockWithStatus.statusCode).toEqual(400);
        expect(send).lastCalledWith("Please send Get request to '/api/qr/your_text' to get encoded text");
    });

    test("When postHandler called with incorrect request then responses with error 400", () => {
        const reqMock = {};

        server.postHandler(reqMock, responseMockWithStatus);

        expect(responseMockWithStatus.statusCode).toEqual(400);
        expect(send).lastCalledWith("Post request should contain 'text' attribute in request body");
    });

    test("When getHandler called with correct request then responses with encoded value", () => {
        const reqMock = { params: { text: testString } };
        const resMock = { json: jest.fn() };

        server.getHandler(reqMock, resMock);

        expect(mockedEncoder).lastCalledWith(testString);
    });

    test("When postHandler called with correct request then responses with encoded value", () => {
        const reqMock = { body: { text: testString } };
        const resMock = { json: jest.fn() };

        server.postHandler(reqMock, resMock);

        expect(mockedEncoder).lastCalledWith(testString);
    });
});
