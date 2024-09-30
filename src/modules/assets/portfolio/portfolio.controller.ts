import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreatePortfolioDto } from "./dto/create_portfolio.dto";
import { PortfolioService } from "./portfolio.service";
import { Auth0Guard } from "src/common/guards/auth.guard";
import { ApiOAuth2, ApiTags } from "@nestjs/swagger";
import { User } from "src/common/decorators/getuser.decorator";
import { User as UserDomain } from "src/domain/user.domain";

@ApiTags('Portfolios')
@UseGuards(Auth0Guard)
@Controller('portfolios')
@ApiOAuth2(['openid', 'profile', 'email'], 'oauth2')
export class PortfolioController{

  constructor(private readonly portfolioService: PortfolioService){}
  @Post()
  async create(@Body() createPortfolioDto: CreatePortfolioDto, @User() user: UserDomain) {
    console.log("user:",user);
    return this.portfolioService.create(createPortfolioDto, user)
  }

}