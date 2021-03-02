"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeStringToQrCode = void 0;
const qrcode_1 = require("@nuintun/qrcode");
function encodeStringToQrCode(input) {
    const encoder = new qrcode_1.Encoder();
    const encoderModuleSize = 15;
    return encoder.write(input).make().toDataURL(encoderModuleSize);
}
exports.encodeStringToQrCode = encodeStringToQrCode;
