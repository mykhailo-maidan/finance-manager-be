import { Injectable } from "@nestjs/common";
import { Database } from "./configs/database.config";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService{
  private databaseConfig: Database

  constructor(configService: ConfigService){
    this.databaseConfig = new Database(configService);
    console.log('initialise the app config service');

  }

  get database(): Database{
    return this.databaseConfig;
  }

}