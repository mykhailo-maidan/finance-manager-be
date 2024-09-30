import { UserEntity } from "src/modules/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { PortfolioType } from "../../../../domain/valueobjects/portfoliotype.enum";

@Entity({name: 'portfolios'})
@Unique(['name','user'])
export class PortfolioEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: false})
  name: string;

  @Column({nullable: true})
  description: string;

  @Column({nullable: false})
  type: PortfolioType;

  @ManyToOne(() => UserEntity, (user) => user.portfolios)
  user: UserEntity;

}