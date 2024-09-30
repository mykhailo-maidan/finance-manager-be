import { Portfolio } from "./portfolio.domain";

export class User {
  id: number
  name: string;
  email: string;
  portfolios: Portfolio[]
  constructor(name: string, email: string){
    this.name = name;
    this.email = email;
  }
}