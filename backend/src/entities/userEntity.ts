import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from "typeorm";
import { Invoice } from "./invoiceEntity";
import { Client } from "./clientEntity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 100 })
    password!: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    username!: string;

    @OneToMany(() => Invoice, (invoice) => invoice.user)
   invoices!: Invoice[];

    @ManyToMany(() => Client, (client) => client.users)
    clients!: Client[]

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

}