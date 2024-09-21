import { DataSource } from "typeorm";

const  buildDataSource = async () => {
  return new DataSource({
    type: "postgres",
    host: "localhost",
    port: 15432,
    username: "postgres",
    password: "postgres",
    database: "finance_manager",
    synchronize: false,
    dropSchema: false,
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/**/*.ts'],
    
  });
}


export default buildDataSource();