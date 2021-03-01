const qrEncoder = require("../src/qrCodeEncoder.js");
const testUtils = require("./testUtils");

test("qrEncoder return correct value", () => {
    const actual = qrEncoder.encodeStringToQrCode(testUtils.testString);
    expect(actual).toEqual(testUtils.encodedTestString);
});
