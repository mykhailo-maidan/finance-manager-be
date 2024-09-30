import { Module } from "@nestjs/common";
import { PortfolioController } from "./portfolio.controller";
import { PortfolioService } from "./portfolio.service";
import { PORTFOLIO_REPOSITORY } from "src/common/providers";
import { PortfolioRepositoryImpl } from "./portfolio.repository";
import { PortfolioEntity } from "./entities/portfolio.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppConfigModule } from "src/modules/app-config/appconfig.module";
import { AppConfigService } from "src/modules/app-config/appconfig.service";
import { UsersService } from "src/modules/users/users.service";
import { UsersModule } from "src/modules/users/users.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([PortfolioEntity]),
    UsersModule,
    AppConfigModule
  ],
  controllers: [PortfolioController],
  providers: [
    PortfolioService,
    {
      provide: PORTFOLIO_REPOSITORY,
      useClass: PortfolioRepositoryImpl 
    },
    
  ],
  exports: [PORTFOLIO_REPOSITORY, PortfolioService]
})


export class PortfolioModule{};