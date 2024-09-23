import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import {  UserEntity } from  './modules/users/entities/user.entity'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { buildConfig }  from './common/config';
import { PortfolioEntity } from './modules/assets/portfolio/entities/portfolio.entity';
import { AssetsModule } from './modules/assets/assets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => buildConfig()
      ]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.db'),
        entities: [UserEntity, PortfolioEntity],
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    AssetsModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
