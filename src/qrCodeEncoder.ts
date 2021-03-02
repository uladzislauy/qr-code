import {Encoder} from "@nuintun/qrcode";

export function encodeStringToQrCode(input: string): string {
    const encoder = new Encoder();
    const encoderModuleSize = 15;
    return encoder.write(input).make().toDataURL(encoderModuleSize);
}
