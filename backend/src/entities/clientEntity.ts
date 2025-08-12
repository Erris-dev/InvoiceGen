// src/entities/Client.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Invoice } from "./invoiceEntity";
import { User } from "./userEntity";

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email!: string;

  @Column({ nullable: true, type: "varchar", length: 15 })
  phone?: string;

  @Column({ nullable: true, type: "varchar", length: 255 })
  address?: string;

  @OneToMany(() => Invoice, (invoice) => invoice.client)
  invoices!: Invoice[];

  @ManyToMany(() => User, (user) => user.clients)
  @JoinTable({
    name: "user_clients", // join table name
    joinColumn: { name: "clientId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "userId", referencedColumnName: "id" },
  })
  users!: User[];
}
