import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";
import { User } from "../entities/userEntity";
import { Invoice } from "../entities/invoiceEntity";
import { Payment } from "../entities/paymentsEntity";
import { InvoiceItem } from "../entities/invoiceItem";
import { Client } from "../entities/clientEntity";
dotenv.config(); 

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [ User, Invoice, Payment, InvoiceItem, Client ],
    migrations: [path.join(__dirname, "../migration", "*.ts")], 
    subscribers: [],
});

export const createConnection = async (): Promise<DataSource> =>{
    try {
        const db = await AppDataSource.initialize();
        console.log("Database connection established successfully.");
        return db;
    } catch (error) {
        console.error("Error establishing database connection:", error);
        throw error;
    }
}