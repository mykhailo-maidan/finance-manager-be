import { Injectable } from "@nestjs/common";
import { PortfolioEntity } from "./entities/portfolio.entity";
import { PortfolioRepository } from "./interfaces/repository.interface";
import { Repository } from "typeorm";
import { Portfolio } from "../../../domain/portfolio.domain";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PortfolioRepositoryImpl implements PortfolioRepository{
  constructor(@InjectRepository(PortfolioEntity) private readonly repository: Repository<PortfolioEntity> ){}

  async create(portfolio: Portfolio): Promise<Portfolio> {
    return this.repository.save(portfolio);
  }

}