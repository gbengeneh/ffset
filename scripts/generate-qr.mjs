import QRCode from "qrcode";
import path from "node:path";

const registrationUrl = "https://ffsetlounge.com/competitions/register";
const outFile = path.join(process.cwd(), "public", "qr", "ffset-championship-qr.png");

await QRCode.toFile(outFile, registrationUrl, {
  type: "png",
  errorCorrectionLevel: "H",
  margin: 2,
  width: 1200,
  color: {
    dark: "#0a0708",
    light: "#ffffff",
  },
});

console.log(`QR code written to ${outFile}`);
console.log(`Encodes: ${registrationUrl}`);
