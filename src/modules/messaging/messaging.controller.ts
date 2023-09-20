import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { MessagingService } from "./messaging.service";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import {
  Error401Options,
  Error500Options,
} from "src/@common/models/objects/error.object";
import { FilesInterceptor } from "@nestjs/platform-express";
import { Roles } from "src/@common/decorators/roles.decorator";
import { ERole } from "src/entities/@enums/role.enum";
import { JwtAuthGuard } from "src/@common/guards/jwt-auth.guard";
import { RolesGuard } from "src/@common/guards/roles.guard";
import { SendWhatsappResponse } from "./response/send-whatsapp.response";
import { SendWhatsappDTO } from "./dto/send-whatsapp.dto";

@Controller("messaging")
@ApiTags("Mensajería")
@ApiBearerAuth("defaultBearerAuth")
@ApiUnauthorizedResponse(Error401Options)
@ApiInternalServerErrorResponse(Error500Options)
export class MessagingController {
  constructor(private messagingService: MessagingService) {}

  @Post("/send-whatsapp")
  @Roles(ERole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor("files"))
  @ApiConsumes("multipart/form-data")
  @ApiCreatedResponse({
    type: SendWhatsappResponse,
    description: "Envío exitoso!",
  })
  async sendWhatsapp(
    @Body() body: SendWhatsappDTO,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log("BODY", body, "FILES", files);
    return await this.messagingService.sendWhatsapp(body, files);
  }

  @Post("/send-sms")
  async sendSMS() {
    return await this.messagingService.sendSMS();
  }

  @Post("/send-email")
  async sendEmail() {
    return await this.messagingService.sendEmail();
  }
}
