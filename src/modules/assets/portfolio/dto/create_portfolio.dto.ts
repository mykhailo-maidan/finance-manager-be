import { Optional } from "@nestjs/common";
import { IsNotEmpty } from "class-validator";
import { PortfolioType } from "../../../../domain/valueobjects/portfoliotype.enum";

export class CreatePortfolioDto{
  @IsNotEmpty()
  name: string;

  @Optional()
  description?: string;

  @IsNotEmpty()
  type: PortfolioType

}