import { PortfolioEntity } from "src/modules/assets/portfolio/entities/portfolio.entity";
import { PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany } from "typeorm";
import { User } from "../../../domain/user.domain";

@Entity({name: 'users'})
export class UserEntity{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({unique: true})
  email: string

  @OneToMany(() => PortfolioEntity, (portfolio) => portfolio.user )
  portfolios: PortfolioEntity[]
}