import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class WhaticketService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    //SendGrid.setApiKey(this.configService.get<string>("sendgrid.apiKey"));
  }
  async getConnection() {
    const { data } = await this.httpService.axiosRef.get("/whatsapps");
    return data;
  }

  async sendWhatsappMessage(body?: any) {
    try {
      const { data } = await this.httpService.axiosRef.post("/messages", {
        whatsappId: "...",
        messages: [
          {
            number: "...",
            name: "Test Contact",
            body: "This is a test message body...",
          },
        ],
      });
      return data;
    } catch (error) {
      console.log("ERROR", error?.response);
      throw new HttpException(
        error?.response?.toString() || error?.toString(),
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
