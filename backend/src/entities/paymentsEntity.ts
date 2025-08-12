// src/entities/Payment.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Invoice } from "./invoiceEntity";
import { Timestamp } from "typeorm/browser";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.payments, { onDelete: "CASCADE" })
  invoice!: Invoice;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount!: number;

  @CreateDateColumn({ type: "timestamp"})
  paymentDate!: Date;

  @Column({ nullable: true })
  paymentMethod?: string; // e.g., Credit Card, Bank Transfer
}
