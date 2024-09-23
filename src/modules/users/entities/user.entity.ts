import { PortfolioEntity } from "src/modules/assets/portfolio/entities/portfolio.entity";
import { PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany } from "typeorm";
import { User } from "../../../domain/user.domain";

@Entity({name: 'users'})
export class UserEntity{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  surname: string

  @Column({unique: true})
  email: string

  @OneToMany(() => PortfolioEntity, (portfolio) => portfolio.user )
  portfolios: PortfolioEntity[]
}

/* 
export function toEntity(user: User): UserEntity{
  const entity = new UserEntity;
  entity.name = user.name;
  entity.surname = user.surname;
  entity.email = user.email;
  return entity;
}

export function toDomain(entity: UserEntity): User{
  const user = new User(
    entity.name,
    entity.surname,
    entity.email
  );
  return user;
} */