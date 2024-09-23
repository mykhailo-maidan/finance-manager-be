import { UserEntity } from "src/modules/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PortfolioType } from "../../../../domain/valueobjects/portfoliotype.enum";

@Entity({name: 'portfolios'})
export class PortfolioEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true})
  name: string;

  @Column({nullable: true})
  description: string;

  @Column({nullable: false})
  type: PortfolioType;

  @ManyToOne(() => UserEntity, (user) => user.portfolios)
  user: UserEntity;

}