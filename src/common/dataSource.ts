import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import buildConfig from './config'
import * as fs from 'fs'
import * as yaml from 'yaml'

const  buildDataSource = async () => {
  const configFilePath = process.argv.find(arg => arg.startsWith('--config='));
  const configPath = configFilePath ? configFilePath.split('=')[1] : 'config.yaml';

  // Read and parse the YAML file
  const configFile = fs.readFileSync(configPath, 'utf8');
  const config = yaml.parse(configFile);
  console.log(config);
  return new DataSource({
    type: "postgres",
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.db,
    synchronize: false,
    dropSchema: false,
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/**/*.ts'],
  });
}


export default buildDataSource();