import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SendWhatsappDTO } from "./dto/send-whatsapp.dto";
import { Repository } from "typeorm";
import { Person } from "src/entities/voters/person.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MessagingService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async sendWhatsapp(data?: SendWhatsappDTO, files?) {
    try {
      const queryBuilder = this.personRepository
        .createQueryBuilder("voter")
        .select("voter.phone");

      if (1 === 1) {
        queryBuilder
          .innerJoin("voter.hobbies", "hobbies")
          .innerJoin("voter.occupations", "occupations");
      }
      if (2 === 2) {
        queryBuilder
          .innerJoin("voter.subdivision", "subdivision")
          .innerJoin("subdivision.division", "division");
      }

      return (await queryBuilder.getMany()).map(({ phone }) => phone);
    } catch (error) {
      console.log("ERROR", error?.response);
      throw new HttpException(
        error?.response?.toString() || error?.toString(),
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async sendSMS(data?: SendWhatsappDTO) {
    try {
      /* return this.whaticketService.sendWhatsappMessage(); */
    } catch (error) {
      console.log("ERROR", error?.response);
      throw new HttpException(
        error?.response?.toString() || error?.toString(),
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async sendEmail(data?: SendWhatsappDTO) {
    try {
      /* return this.whaticketService.sendWhatsappMessage(); */
    } catch (error) {
      console.log("ERROR", error?.response);
      throw new HttpException(
        error?.response?.toString() || error?.toString(),
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
