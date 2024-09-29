import { Module } from "@nestjs/common";
import { PortfolioModule } from "./portfolio/portfolio.module";
import { Auth0Guard } from "src/common/guards/auth.guard";
import { AppConfigService } from "../app-config/appconfig.service";
import { AppConfigModule } from "../app-config/appconfig.module";

@Module({
  imports: [
    PortfolioModule
  ]
})


export class AssetsModule{};