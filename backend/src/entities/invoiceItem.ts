// src/entities/InvoiceItem.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Invoice } from "./invoiceEntity";

@Entity()
export class InvoiceItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.items, { onDelete: "CASCADE" })
  invoice!: Invoice;

  @Column(  { type: "varchar", length: 255 })
  description!: string;

  @Column({ type: "int" })
  quantity!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  unitPrice!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  lineTotal!: number; // quantity * unitPrice
}
