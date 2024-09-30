import { Injectable } from "@nestjs/common";
import { PortfolioEntity } from "./entities/portfolio.entity";
import { PortfolioRepository } from "./interfaces/repository.interface";
import { Repository } from "typeorm";
import { Portfolio } from "../../../domain/portfolio.domain";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/domain/user.domain";
import { UserEntity } from "src/modules/users/entities/user.entity";

@Injectable()
export class PortfolioRepositoryImpl implements PortfolioRepository{
  constructor(@InjectRepository(PortfolioEntity) private readonly repository: Repository<PortfolioEntity> ){}

  async create(portfolio: Portfolio, user: User): Promise<Portfolio> {
    const userEntity = new UserEntity();
    userEntity.id = user.id;
    userEntity.email = user.email;
    userEntity.name = user.name;
    const por = this.repository.create(portfolio);
    por.user = userEntity;
    return await this.repository.save(por);
  }

}