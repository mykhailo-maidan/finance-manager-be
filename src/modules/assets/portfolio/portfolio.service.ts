import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { PORTFOLIO_REPOSITORY } from "src/common/providers";
import { PortfolioRepository } from "./interfaces/repository.interface";
import { CreatePortfolioDto } from "./dto/create_portfolio.dto";
import { Portfolio } from "src/domain/portfolio.domain";
import { User } from "src/domain/user.domain";

@Injectable()
export class PortfolioService{
  constructor(
    @Inject(PORTFOLIO_REPOSITORY) private readonly portfolioRepository: PortfolioRepository
  ){}

  async create(createPortfolioDto: CreatePortfolioDto, user: User){
    try {
      const portfolio = new Portfolio(
        createPortfolioDto.name,
        createPortfolioDto.description === undefined ? '' :  createPortfolioDto.description,
        createPortfolioDto.type
       );

       await this.portfolioRepository.create(portfolio,user);
    }catch(error){
      throw new BadRequestException("Somethign went wrong")
    }
  }
}

