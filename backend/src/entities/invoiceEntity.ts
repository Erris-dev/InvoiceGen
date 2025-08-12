// src/entities/Invoice.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { User } from "./userEntity";
import { Client } from "./clientEntity";
import { InvoiceItem } from "./invoiceItem";
import { Payment } from "./paymentsEntity";

export type InvoiceStatus = "pending" | "paid" | "overdue" | "DRAFT";
const invoiceStatuses = ["pending", "paid", "overdue", "DRAFT"];


@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.invoices, { onDelete: "CASCADE" })
  user!: User;

  @ManyToOne(() => Client, (client) => client.invoices, { onDelete: "CASCADE" })
  client!: Client;

  @Column( { type: "varchar", length: 50, unique: true })
  invoiceNumber!: string;

  @CreateDateColumn( { type: "timestamp" })
  issueDate!: Date;

  @Column({ type: "date" })
  dueDate!: Date;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  totalAmount!: number;

  @Column({ default: "pending", type: "enum", enum: invoiceStatuses, })
  status!: InvoiceStatus;

  @OneToMany(() => InvoiceItem, (item) => item.invoice, { cascade: true })
  items!: InvoiceItem[];

  @OneToMany(() => Payment, (payment) => payment.invoice, { cascade: true })
  payments!: Payment[];
}
