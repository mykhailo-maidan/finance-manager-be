import { Portfolio } from "../../../../domain/portfolio.domain";

export interface PortfolioRepository{
  create(portfolio: Portfolio): Promise<Portfolio>;
}