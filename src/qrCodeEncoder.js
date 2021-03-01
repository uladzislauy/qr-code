const qrCode = require("@nuintun/qrcode");

function encodeStringToQrCode(input) {
    const encoder = new qrCode.Encoder();
    const encoderModuleSize = 15;
    const encodedData = encoder.write(input).make().toDataURL(encoderModuleSize);
    return encodedData;
}

module.exports = {
    encodeStringToQrCode: encodeStringToQrCode
};
