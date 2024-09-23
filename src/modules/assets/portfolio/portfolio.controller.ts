import { Body, Controller, Post } from "@nestjs/common";
import { CreatePortfolioDto } from "./dto/create_portfolio.dto";
import { PortfolioService } from "./portfolio.service";


@Controller('portfolios')
export class PortfolioController{

  constructor(private readonly portfolioService: PortfolioService){}
  @Post()
  async create(@Body() createPortfolioDto: CreatePortfolioDto) {
    return this.portfolioService.create(createPortfolioDto)
  }

}