import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigModuleOptions, ConfigService } from "@nestjs/config";
import { AppConfigService } from "./appconfig.service";


@Module({
  providers: [AppConfigService],
  exports: [AppConfigService]
})

export class AppConfigModule{
  static forRoot(options?: ConfigModuleOptions) : DynamicModule{
    return {
      module: AppConfigModule,
      imports: [
        ConfigModule.forRoot({
          ...options
        })
      ],
      providers: [AppConfigService],
      exports: [AppConfigService]
    }
  }
}