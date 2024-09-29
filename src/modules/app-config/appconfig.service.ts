import { Injectable } from "@nestjs/common";
import { Database } from "./configs/database.config";
import { ConfigService } from "@nestjs/config";
import { OAuth2Config } from "./configs/oauth2.config";

@Injectable()
export class AppConfigService{
  private databaseConfig: Database
  private oauth2Config: OAuth2Config;

  constructor(configService: ConfigService){
    this.databaseConfig = new Database(configService);
    this.oauth2Config = new OAuth2Config(configService);
    console.log('initialise the app config service');

  }

  get database(): Database{
    return this.databaseConfig;
  }

  get oauth2(): OAuth2Config{
    return this.oauth2Config;
  }

}