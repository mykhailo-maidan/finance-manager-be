import { ConfigService } from "@nestjs/config";

export class OAuth2Config {
  private configService: ConfigService;

  constructor(configService: ConfigService){
    this.configService = configService;
  }

  get authUrl(): string {
    return this.configService.get<string>('oauth2.authorizationUrl','');
  }

  get tokenUrl(): string{
    return this.configService.get<string>('oauth2.tokenUrl','');
  }

  get clientId(): string{
    return this.configService.get<string>('oauth2.clientId','');
  }

  get clientSecret(): string{
    return this.configService.get<string>('oauth2.clientSecret','');
  }

  get audience(): string{
    return this.configService.get<string>('oauth2.audience', '');
  }

  get issuer(): string{
    return this.configService.get<string>('oath2.issuer','');
  }

  get keysUrl(): string{
    return this.configService.get<string>('oauth2.keysUrl','');
  }
  



}