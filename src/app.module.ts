import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { UserEntity } from  './modules/users/entities/user.entity'
import { buildConfig }  from './common/config';
import { PortfolioEntity } from './modules/assets/portfolio/entities/portfolio.entity';
import { AssetsModule } from './modules/assets/assets.module';
import { AppConfigModule } from './modules/app-config/appconfig.module';
import { AppConfigService } from './modules/app-config/appconfig.service';

@Module({
  imports: [
    AppConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => buildConfig()
      ]
    }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (configService: AppConfigService) => ({
        type: "postgres",
        host: configService.database.host,
        port: configService.database.port,
        username: configService.database.username,
        password: configService.database.password,
        database: configService.database.db,
        entities: [UserEntity, PortfolioEntity],
        synchronize: true
      }),
      inject: [AppConfigService]
    }),
    UsersModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
