import { registerAs } from "@nestjs/config";

export default registerAs("whaticket", () => ({
  baseUrl: process.env.WHATICKET_BASE_URL,
  token: process.env.WHATICKET_TOKEN,
}));
