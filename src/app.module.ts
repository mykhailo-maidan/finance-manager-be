import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { User  as UserEntity } from  './modules/users/entities/user.entity'
import { ConfigModule, ConfigService } from '@nestjs/config';
import buildConfig from './common/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        buildConfig()
      ]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('databse.username'),
        password: configService.get('database.password'),
        database: configService.get('databse.db'),
        entities: [UserEntity],
        synchronize: true
      })
    }),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
