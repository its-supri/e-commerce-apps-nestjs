const { DataSource } = require('typeorm');
import * as dotenv from 'dotenv';
dotenv.config();

const dataSource = new DataSource({
    type: process.env.DB_TYPE ?? 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: +process.env.DB_SYNC === 1,
});

dataSource.initialize();

module.exports = { dataSource };