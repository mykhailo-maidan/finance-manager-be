import { Module } from "@nestjs/common";
import { PortfolioController } from "./portfolio.controller";
import { PortfolioService } from "./portfolio.service";
import { PORTFOLIO_REPOSITORY } from "src/common/providers";
import { PortfolioRepositoryImpl } from "./portfolio.repository";
import { PortfolioEntity } from "./entities/portfolio.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([PortfolioEntity])
  ],
  controllers: [PortfolioController],
  providers: [
    PortfolioService,
    {
      provide: PORTFOLIO_REPOSITORY,
      useClass: PortfolioRepositoryImpl 
    }
  ],
  exports: [PORTFOLIO_REPOSITORY, PortfolioService]
})


export class PortfolioModule{};