import { PortfolioType } from "./valueobjects/portfoliotype.enum";

export class Portfolio{
  name: string;
  description?: string;
  type: PortfolioType
  constructor(name: string, desciprion: string, type: PortfolioType) {
    this.name = name;
    this.description = desciprion;
    this.type = type;
  }
}