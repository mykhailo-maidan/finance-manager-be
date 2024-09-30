import { User } from "src/domain/user.domain";
import { Portfolio } from "../../../../domain/portfolio.domain";

export interface PortfolioRepository{
  create(portfolio: Portfolio, user: User): Promise<Portfolio>;
}