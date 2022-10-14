import { Global, Module } from "@nestjs/common"
import { SendgridService } from "./services/sendgrid/sendgrid.service"

@Global()
@Module({
  providers: [SendgridService],
  exports: [SendgridService]
})
export class CommonModule { }