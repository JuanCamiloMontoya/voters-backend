import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as SendGrid from '@sendgrid/mail'

@Injectable()
export class SendgridService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('sendgrid.apiKey'))
  }

  async sendEmail(to: any, template: any, substitutions: any) {
    try {

      const emailData = {
        to,
        from: this.configService.get<string>('sendgrid.fromEmail'),
        templateId: template.id,
        dynamic_template_data: {
          ...substitutions,
          subject: template.subject
        }
      }

      return await SendGrid.send(emailData)
    } catch (error) {
      throw new HttpException(
        error.response || error.detail || error,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
