import { ConfigService } from "@nestjs/config";

export class Database{
  constructor(private readonly configService: ConfigService){}

  get port(): number {
    return this.configService.get<number>('database.port',5432);
  }

  get host(): string {
    return this.configService.get<string>('database.host','localhost');
  }

  get db(): string {
    return this.configService.get<string>('dabatase.db','postgres');
  }

  get username(): string {
    return this.configService.get<string>('database.username', 'postgres');
  }

  get password(): string {
    return this.configService.get<string>('database.password','postgres');
  }
}