import { CreateVoterDTO } from "./create-voter.dto";
import { OmitType } from "@nestjs/swagger";

export class UpdateVoterDTO extends OmitType(CreateVoterDTO, ["document"]) {}
